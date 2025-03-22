import { extractTweetData } from "@/utils/feed/parser";
import RatingPanel from "./RatingPanel";
import ReactDOM from "react-dom/client";

const Rating = () => {
  const injectPanels = () => {
    document
      .querySelectorAll('article[data-testid="tweet"]')
      .forEach((tweet) => {
        if (tweet.getAttribute("data-rating-injected")) return;

        const avatarElement = tweet.querySelector(
          'div[data-testid="Tweet-User-Avatar"]'
        );
        if (!avatarElement) return;

        const container = document.createElement("div");
        container.className = "x-rating-panel-container";

        avatarElement.insertAdjacentElement("afterend", container);

        const root = ReactDOM.createRoot(container);
        const tweetData = extractTweetData(tweet as HTMLElement);
        root.render(<RatingPanel {...tweetData} />);

        tweet.setAttribute("data-rating-injected", "true");
      });
  };

  useEffect(() => {
    injectPanels();

    const observer = new MutationObserver(injectPanels);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".x-rating-panel-container")
        .forEach((container) => {
          ReactDOM.createRoot(container).unmount();
          container.remove();
        });
    };
  }, []);

  return null;
};

export default Rating;
