import json

# Function to group words based on the updated rules
def group_words(data):
    words_grouped = {
        "words": [],
        "plural": [],
        "past": []
    }

    for item in data['words']:
        word = item['word']

        # Rule for plural ending with "S" or "ES"
        if item['plural'] and (word.endswith('s') or word.endswith('es')):
            words_grouped['plural'].append(word)

        # Rule for past tense ending with "ED"
        elif item['pastTense'] and word.endswith('ed'):
            words_grouped['past'].append(word)

        # Words that don't fit the above rules
        else:
            words_grouped['words'].append(word)

    return words_grouped

# Function to read the input JSON and write the output JSON
def process_words(input_file, output_file):
    with open(input_file, 'r') as infile:
        data = json.load(infile)

    grouped_words = group_words(data)

    with open(output_file, 'w') as outfile:
        json.dump(grouped_words, outfile, indent=2)

    print(f"Grouped words saved to {output_file}")

# Main function
def main():
    input_file = 'word_analysis.json'  # Input file from previous script
    output_file = 'grouped_words.json'  # Output file with grouped words

    process_words(input_file, output_file)

if __name__ == "__main__":
    main()
