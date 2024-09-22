import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Helper function to load emails from the directories
def load_emails(directory, label):
    emails = []
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            with open(filepath, 'r', errors='ignore') as file:
                emails.append({'email': file.read(), 'label': label})
    return emails

# Load phishing and legitimate emails
phishing_emails = load_emails('datasets/spam', 1)  # 1 for phishing/spam
ham_emails = load_emails('datasets/easy_ham', 0)  # 0 for legitimate emails

# Combine the datasets into a single DataFrame
emails_data = pd.DataFrame(phishing_emails + ham_emails)

# Clean and preprocess the email text data
def clean_text(text):
    return text.lower().strip()

emails_data['cleaned_text'] = emails_data['email'].apply(clean_text)

# Use TF-IDF to convert the text into numerical features
vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
X = vectorizer.fit_transform(emails_data['cleaned_text'])

# Labels (0 for legitimate, 1 for phishing)
y = emails_data['label']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Logistic Regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions and evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Model Accuracy: {accuracy}')

# Save the model to a file
joblib.dump(model, 'phishing_model.pkl')

# Save the vectorizer (for converting emails to features during deployment)
joblib.dump(vectorizer, 'vectorizer.pkl')
