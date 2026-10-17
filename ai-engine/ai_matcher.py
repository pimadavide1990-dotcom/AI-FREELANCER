# ai-engine/ai_matcher.py
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

print("Caricamento modello IA in corso...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ Modello IA di Matching Pronto!")

@app.route('/match', methods=['POST'])
def match():
    data = request.json
    job_desc = data.get('job_description', '')
    freelancers = data.get('freelancers', [])

    if not job_desc or not freelancers:
        return jsonify({"error": "Dati mancanti"}), 400

    job_vector = model.encode([job_desc])
    results = []

    for f in freelancers:
        profile_text = f"{f['title']}. Competenze: {', '.join(f['skills'])}. Bio: {f['bio']}"
        f_vector = model.encode([profile_text])
        score = float(cosine_similarity(job_vector, f_vector)[0][0])
        match_score = round(score * 100, 1)

        results.append({
            "id": f["id"],
            "name": f["name"],
            "title": f["title"],
            "match_score": match_score
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return jsonify({"success": True, "results": results})

if __name__ == '__main__':
    app.run(port=5001, debug=True)