import json

# Function to remove previous answers from 'words' and add to 'previousAnswers'
def filter_previous_answers(grouped_words, previous_answers):
    filtered_words = []
    previous = []

    # Filter out words in previous_answers from grouped_words['words']
    for word in grouped_words['words']:
        if word in previous_answers:
            previous.append(word)
        else:
            filtered_words.append(word)

    # Update the grouped_words dictionary
    grouped_words['words'] = filtered_words
    grouped_words['previousAnswers'] = previous

    return grouped_words

# Function to read JSON files and process the data
def process_grouped_words(grouped_file, previous_file, output_file):
    # Read the grouped_words.json file
    with open(grouped_file, 'r') as infile:
        grouped_words = json.load(infile)

    # Read the previous_answers.json file
    with open(previous_file, 'r') as prevfile:
        previous_answers_data = json.load(prevfile)
        previous_answers = previous_answers_data.get('previousAnswers', [])

    # Filter previous answers and update the words list
    updated_grouped_words = filter_previous_answers(grouped_words, previous_answers)

    # Write the updated data to the output file
    with open(output_file, 'w') as outfile:
        json.dump(updated_grouped_words, outfile, indent=2)

    print(f"Updated grouped words saved to {output_file}")

# Main function to run the process
def main():
    grouped_file = 'grouped_words.json'  # Input file (grouped_words)
    previous_file = 'previous_answers.json'  # Input file (previous_answers)
    output_file = 'updated_grouped_words.json'  # Output file

    process_grouped_words(grouped_file, previous_file, output_file)

if __name__ == "__main__":
    main()
