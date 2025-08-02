const Contact = () => {
    return (
        <div className="mt-16 max-w-4xl mx-auto px-6 py-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl shadow-lg border-2 border-gray-600/13">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Contact Us</h1>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-300 mb-4">Get in Touch</h2>
                    <p className="text-gray-300 mb-6 text-lg">
                        Have questions about Xployt.ai? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                    </p>
                    <div className="mb-6">
                        <div>
                            <h3 className="font-semibold text-white">Email</h3>
                            <p className="text-blue-400">support@xployt.ai</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Office Hours</h3>
                            <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-300 mb-4">Send us a Message</h2>
                    <form className="flex flex-col gap-5 bg-gradient-radial from-gray-700/10 via-gray-900/75 to-gray-900/75 rounded-2xl shadow-2xl p-10 px-8 pb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input 
                                type="text" 
                                className="w-full py-3 px-4 border border-gray-700 rounded-lg text-base outline-none bg-gray-900 text-white transition-all duration-200 focus:border-blue-400 focus:shadow-[0_0_0_2px_rgba(96,165,250,0.2)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input 
                                type="email" 
                                className="w-full py-3 px-4 border border-gray-700 rounded-lg text-base outline-none bg-gray-900 text-white transition-all duration-200 focus:border-blue-400 focus:shadow-[0_0_0_2px_rgba(96,165,250,0.2)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea 
                                rows={4}
                                className="w-full py-3 px-4 border border-gray-700 rounded-lg text-base outline-none bg-gray-900 text-white transition-all duration-200 focus:border-blue-400 focus:shadow-[0_0_0_2px_rgba(96,165,250,0.2)]"
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-transparent text-white py-3 rounded-lg text-lg font-bold cursor-pointer transition-all duration-200 border-2 border-white hover:bg-white hover:text-gray-900"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact; 