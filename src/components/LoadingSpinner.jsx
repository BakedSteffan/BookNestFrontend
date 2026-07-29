function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="text-center my-5">

            <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>

            <p className="mt-3 text-muted fw-semibold">
                {text}
            </p>

        </div>
    );
}

export default LoadingSpinner;