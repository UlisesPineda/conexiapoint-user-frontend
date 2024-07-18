import './styles/LoadingPage.css';

export const LoadingPage = () => {
  return (
    <main className="loading-container">
      <div className="loading-block-container">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          id="Capa_1"
          x={0}
          y={0}
          style={{
            enableBackground: "new 0 0 154 82",
          }}
          viewBox="0 0 154 82"
        >
          <circle cx={57.42} cy={41} r={13.48} className="st0" />
          <path
            d="M151 2.06h-17.07l-18.85 26.93-.29.41 8.25 11.78-8.25 11.78.29.4 18.61 26.58h17.06l-27.14-38.76z"
            className="st0"
          />
          <path
            d="m107.8 29.4-.28-.41L88.66 2.06H71.6l27.39 39.12-27.15 38.76h17.07l18.61-26.58.28-.4 8.25-11.78zM41.94 65.96c-13.79 0-24.96-11.18-24.96-24.96 0-13.79 11.18-24.96 24.96-24.96h22.47L54.62 2.06H41.94C20.43 2.06 3 19.49 3 41c0 21.51 17.43 38.94 38.94 38.94h12.93l9.79-13.98H41.94z"
            className="st0"
          />
        </svg>

      </div>
    </main>
  );
};
