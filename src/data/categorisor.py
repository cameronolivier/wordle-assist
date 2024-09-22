import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
import json

# Ensure necessary NLTK data is downloaded
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

lemmatizer = WordNetLemmatizer()

# Function to get the part of speech (POS) for lemmatization
def get_pos(word):
    pos_tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ, "N": wordnet.NOUN, "V": wordnet.VERB, "R": wordnet.ADV}
    return tag_dict.get(pos_tag, wordnet.NOUN)

# Function to read the word list from a JSON file
def read_words_from_json(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
        return data['words']

# Analyze each word: determine lemma, plural, and past tense
def analyze_words(words):
    results = []
    for word in words:
        lemma = lemmatizer.lemmatize(word, get_pos(word))
        pos = get_pos(word)
        is_plural = (lemma != word and pos == wordnet.NOUN)
        is_past = (lemma != word and pos == wordnet.VERB)
        results.append({
            'word': word,
            'lemma': lemma,
            'plural': is_plural,
            'pastTense': is_past
        })
    return results

# Save results to a JSON file
def save_to_json(data, filename):
    with open(filename, 'w') as json_file:
        json.dump({'words': data}, json_file, indent=2)

# Main function to run the analysis
def main():
    json_file = 'wordlist.json'  # Path to your JSON file
    output_file = 'word_analysis.json'  # Output JSON file
    words = read_words_from_json(json_file)
    results = analyze_words(words)
    save_to_json(results, output_file)
    print(f"Results saved to {output_file}")

if __name__ == "__main__":
    main()
