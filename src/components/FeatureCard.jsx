function FeatureCard({ icon, title, description }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 text-center p-4">

                <div className="display-4 mb-3">
                    {icon}
                </div>

                <h4>{title}</h4>

                <p>
                    {description}
                </p>

            </div>
        </div>
    );
}

export default FeatureCard;
