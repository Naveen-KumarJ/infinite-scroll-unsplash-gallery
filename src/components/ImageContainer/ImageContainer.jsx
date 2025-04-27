import React, { useEffect, useReducer, useRef } from "react";
import axios from "axios";
const ACCESS_KEY = "l0wmLN0Sd538sl8B2O0m6QsUqZxa-pPe4fweg7RoBx0";

const initialState = {
  loading: false,
  images: [],
  page: 1,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        images: [...state.images, ...action.payload],
        page: state.page + 1,
      };
    default:
      return state;
  }
}

const ImageContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchImages = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?page=${state.page}&per_page=20&client_id=${ACCESS_KEY}`
      );
      console.log(response.data);
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", error_msg: error });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10 &&
        !state.loading
      ) {
        fetchImages();
      }
    };

    window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, [state.loading, state.page]);
  return (
    <section className="">
      <div className="flex flex-col justify-center items-center gap-3.5">
        {state.images.map((image, index) => (
          <div key={`${image.id}-${index}`} className="md:w-1/2 h-1/2">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full aspect-square object-cover"
            />
          </div>
        ))}
      </div>
      {state.loading && <p style={{ textAlign: 'center', margin: '20px' }}>Loading...</p>}
      {state.error && <p style={{ textAlign: 'center', color: 'red' }}>{state.error}</p>}
    </section>
  );
};

export default ImageContainer;
