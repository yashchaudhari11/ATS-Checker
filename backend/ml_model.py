from flask import Flask, request, jsonify
import pdfplumber
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import base64
import os

# Initialize Flask app
app = Flask(__name__)

# Download required NLTK data
nltk.download('stopwords')
from nltk.corpus import stopwords

def extract_text_from_pdf(pdf_base64):
    """Extracts text from a Base64-encoded PDF."""
    pdf_bytes = base64.b64decode(pdf_base64)
    pdf_path = "temp.pdf"

    with open(pdf_path, "wb") as f:
        f.write(pdf_bytes)

    with pdfplumber.open(pdf_path) as pdf:
        text = " ".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    
    os.remove(pdf_path)  # Clean up temporary file
    return text.strip()

def calculate_ats_score(resume_text, job_desc_text):
    """Calculates ATS score using TF-IDF & Cosine Similarity."""
    stop_words = set(stopwords.words("english"))
    
    # Preprocess text (remove stopwords)
    resume_text = " ".join([word for word in resume_text.split() if word.lower() not in stop_words])
    job_desc_text = " ".join([word for word in job_desc_text.split() if word.lower() not in stop_words])

    # Vectorize text using TF-IDF
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume_text, job_desc_text])

    # Compute Cosine Similarity
    similarity_score = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]

    return round(similarity_score * 100, 2)  # Convert to percentage (0-100)

@app.route("/api/ats-score", methods=["POST"])
def ats_score():
    """API endpoint to calculate ATS score."""
    data = request.json

    if "resume" not in data or "jobDescription" not in data:
        return jsonify({"error": "Missing resume or jobDescription"}), 400

    resume_text = extract_text_from_pdf(data["resume"])
    job_desc_text = extract_text_from_pdf(data["jobDescription"])

    if not resume_text or not job_desc_text:
        return jsonify({"error": "Failed to extract text from PDFs"}), 400

    score = calculate_ats_score(resume_text, job_desc_text)
    return jsonify({"ats_score": score})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)  # Running on port 5001
