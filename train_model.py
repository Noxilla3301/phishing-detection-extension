# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Load phishing and legitimate email datasets
phishing_data = pd.read_csv('CEAS_08.csv')  # Adjust with actual file paths
enron_data = pd.read_csv('emails.csv')

# Label phishing emails as 1 and legitimate emails as 0
phishing_data['label'] = 1
enron_data['label'] = 0

# Combine the datasets
combined_data = pd.concat([phishing_data, enron_data], ignore_index=True)

# Clean and preprocess the email text data
def clean_text(text):
    return text.lower().strip()

combined_data['cleaned_text'] = combined_data['email_column'].apply(clean_text)  # Adjust the column name

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

# Save the vectorizer (for converting new emails to features during deployment)
joblib.dump(vectorizer, 'vectorizer.pkl')
