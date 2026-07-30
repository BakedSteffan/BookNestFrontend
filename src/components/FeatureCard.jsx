import "../styles/FeatureCard.css";

function FeatureCard({ icon, title, description }) {

    return (

        <div className="col-md-4">

            <div className="feature-card text-center h-100">

                <div className="feature-icon">

                    <i className={icon}></i>

                </div>

                <h4 className="mt-4 mb-3">
                    {title}
                </h4>

                <p className="text-muted mb-0">
                    {description}
                </p>

            </div>

        </div>

    );

}

export default FeatureCard;