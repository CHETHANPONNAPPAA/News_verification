import sys
import joblib

# LOAD MODEL
model = joblib.load('ai/fake_news_model.pkl')

# LOAD VECTORIZER
vectorizer = joblib.load('ai/tfidf_vectorizer.pkl')

# GET INPUT TEXT
text = sys.argv[1]

# VECTORIZE INPUT
vectorized_text = vectorizer.transform([text])

# PREDICT
prediction = model.predict(vectorized_text)[0]

# GET CONFIDENCE SCORE
confidence = model.decision_function(vectorized_text)[0]

# CONVERT TO SCORE
score = round(abs(confidence) * 20)

# LIMIT SCORE
if score > 99:
    score = 99

# OUTPUT
if prediction == 1:

    print(f"Verified|{score}")

else:

    print(f"Fake|{score}")