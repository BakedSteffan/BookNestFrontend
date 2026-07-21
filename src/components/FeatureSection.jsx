import FeatureCard from "./FeatureCard";

function FeatureSection() {
    return (
        <section className="container my-5">

            <h2 className="text-center mb-5">
                Why Choose BookNest?
            </h2>

            <div className="row">

                <FeatureCard
                    icon="📚"
                    title="Easy Borrowing"
                    description="Borrow books quickly with a simple and intuitive process."
                />

                <FeatureCard
                    icon="⚡"
                    title="Fast & Modern"
                    description="Enjoy a clean and responsive library experience."
                />

                <FeatureCard
                    icon="👥"
                    title="Student & Librarian Friendly"
                    description="Designed for both students and librarians to manage books efficiently."
                />

            </div>

        </section>
    );
}

export default FeatureSection;
