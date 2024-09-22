import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Function to read emails from a directory
def load_emails_from_directory(directory):
    emails = []
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='latin-1') as file:
            emails.append(file.read())
    return emails

# Load phishing and legitimate email datasets
spam_emails = load_emails_from_directory('datasets/spam')
ham_emails = load_emails_from_directory('datasets/easy_ham')

# Label phishing emails as 1 and legitimate emails as 0
spam_data = pd.DataFrame({'email': spam_emails, 'label': 1})
ham_data = pd.DataFrame({'email': ham_emails, 'label': 0})

# Combine the datasets
combined_data = pd.concat([spam_data, ham_data], ignore_index=True)

# Clean and preprocess the email text data
def clean_text(text):
    return text.lower().strip()

combined_data['cleaned_text'] = combined_data['email'].apply(clean_text)

# Use TF-IDF to convert the text into numerical features
vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
X = vectorizer.fit_transform(combined_data['cleaned_text'])

# Labels (0 for legitimate, 1 for phishing)
y = combined_data['label']

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
