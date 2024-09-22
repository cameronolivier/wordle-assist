import json

# Function to remove words from first file that are found in second file
def remove_common_words(file1_words, file2_words):
    # Use a set for efficient lookup and filtering
    words_to_remove = set(file2_words)
    filtered_words = [word for word in file1_words if word not in words_to_remove]
    return filtered_words

# Function to process both JSON files and write the result to a new file
def process_files(file1, file2, output_file):
    # Load the words from the first file
    with open(file1, 'r') as f1:
        data1 = json.load(f1)
        words1 = data1.get('words', [])

    # Load the words from the second file
    with open(file2, 'r') as f2:
        data2 = json.load(f2)
        words2 = data2.get('words', [])

    # Remove common words
    filtered_words = remove_common_words(words1, words2)

    # Prepare the result as a new dictionary
    result = {
        "words": filtered_words
    }

    # Write the result to the output file
    with open(output_file, 'w') as outfile:
        json.dump(result, outfile, indent=2)

    print(f"Filtered words saved to {output_file}")

# Main function to run the process
def main():
    file1 = 'categorised_words.json'  # Input file 1 with the words to filter
    file2 = 'previous_answers.json'  # Input file 2 with the words to remove
    output_file = 'words_no_previous.json'  # Output file with filtered results

    process_files(file1, file2, output_file)

if __name__ == "__main__":
    main()
