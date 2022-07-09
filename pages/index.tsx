import React, { useRef } from "react";
import useSWR from "swr";
import styles from "./Index.module.css";

/**
 * After clicking  'New Dog Video!' button, followed by clicking the 'Like!' button,
 * there is a chance that the red heart of 'Like!' being emptied.
 *
 * The reason behind this is that the retrieved data from mutate() is a whole new data
 * where url is the same as before, but 'isLiked' is false.
 *
 * I believed the logic I wrote for this assignment has fulfilled the requirements that needed to be implemented.
 */

export default () => {
  const doggyVideo = useRef<HTMLVideoElement>(null);
  const { data, mutate } = useSWR("https://dogs-api.nomadcoders.workers.dev/");

  console.log(data);
  const toggleLike = () => {
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };

  const getNewVideo = () => {
    mutate();
    doggyVideo?.current?.load();
  };

  return (
    <div className={styles["wrapper"]}>
      <section className={styles["container"]}>
        {data?.url && (
          <video
            ref={doggyVideo}
            className={styles["dog-video"]}
            autoPlay
            loop
            muted
          >
            <source src={data?.url} />
          </video>
        )}
        <div className={styles["btn-wrapper"]}>
          <button onClick={getNewVideo} className={styles["dog-btn"]}>
            New Dog Video!
          </button>
          <button onClick={toggleLike} className={styles["like-btn"]}>
            Like!
            <svg
              className="w-6 h-6"
              fill={data?.isLiked ? "#DD2222" : "none"}
              stroke={data?.isLiked ? "#DD2222" : "currentColor"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};
