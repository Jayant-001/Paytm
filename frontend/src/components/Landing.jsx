const Landing = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-2 flex flex-col items-center justify-center">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    Welcome to Paytm
                </h1>
                <p className="text-lg text-gray-600">
                    The secure and convenient way to manage your finances.
                </p>
            </header>

            <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                        <img
                            src="/path/to/your/image1.jpg"
                            alt="Image 1"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="text-center">
                        <img
                            src="/path/to/your/image2.jpg"
                            alt="Image 2"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                        <img
                            src="/path/to/your/image3.jpg"
                            alt="Image 3"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="text-center">
                        <div className="py-4">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Fast and Secure Payments
                            </h2>
                            <p className="text-lg text-gray-600">
                                Make payments quickly and securely with Paytm.
                            </p>
                        </div>
                        <div className="py-4">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Manage Your Finances
                            </h2>
                            <p className="text-lg text-gray-600">
                                Track your expenses, check balances, and more.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white text-center py-4 mt-auto w-full">
                <p>&copy; 2024 Jayant. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
