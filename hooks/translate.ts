import { useTranslations } from "next-intl";

export default function translate(): (sentence: string) => string {
  const t = useTranslations();

  return (sentence: string) => {
    let input = sentence;
    const words = input.replace(/[^\w\s\']/gm, "").split(" ");

    words.forEach((word) => {
      if (word.length > 2) {
        input = input.replace(word, t(word));
      }
    });

    return input;
  };
}
