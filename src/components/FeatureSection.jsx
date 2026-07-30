import FeatureCard from "./FeatureCard";

function FeatureSection() {
    return (
        <section className="container py-5">

            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    Why Choose BookNest?
                </h2>

                <p className="text-muted mt-3">
                    Everything you need for a modern and seamless digital library experience.
                </p>

            </div>

            <div className="row g-4">

                <FeatureCard
                    icon="bi bi-book-half"
                    title="Borrow with Ease"
                    description="Borrow books quickly through a simple and intuitive process designed for students."
                />

                <FeatureCard
                    icon="bi bi-lightning-charge-fill"
                    title="Modern Experience"
                    description="Enjoy a fast, responsive interface built with today's web technologies."
                />

                <FeatureCard
                    icon="bi bi-people-fill"
                    title="Built for Everyone"
                    description="Designed for students and librarians to efficiently manage books and borrowing."
                />

            </div>

        </section>
    );
}

export default FeatureSection;