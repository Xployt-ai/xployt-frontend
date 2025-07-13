const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions about Xployt.ai? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900">Email</h3>
                            <p className="text-blue-600">support@xployt.ai</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Office Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea 
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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