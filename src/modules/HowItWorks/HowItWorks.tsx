import Typography from '../../components/Typography';

export default function HowItWorks() {
  return (
    <div className="my-5 px-10">
      <Typography className="text-2xl text-slate-300">How it works:</Typography>
      <Typography className="text-slate-300">
        1. Enter a list of words and press &quot;Add&quot;. This will be the
        dictionary of words that the app will query and provide results from.
        Feel free to use one of our supplied dictionaries or add your own.
        <br />
        2. Either pick the first word in the list of results or use your own -
        and enter it into your Wordle game.
        <br />
        3. Based on the Wordle feedback, update the filters section. Add the
        letters to exclude as well as the letters to include, setting based on
        the yellow/green feedback.
        <br />
        4. The app will provide a list of available words ranked by the sum of
        the number of times each letter appears in the word list. This should
        provide you with the best word to filter out high-frequency letters.
        <br />
        5. Plug this word (in 4) into Wordle, or feel free to pick one of the
        other options.
        <br />
        6. Repeat steps 3-5 until you have won Wordle for today (or run out of
        turns).
      </Typography>
    </div>
  );
}
