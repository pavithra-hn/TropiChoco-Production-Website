import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-200 pt-20 pb-10 text-gray-400">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
                        Nano Banana
                    </h3>
                    <p className="text-sm leading-relaxed">
                        The future of freshness. Cold-pressed, HPP treated, and delivered
                        with zero compromise.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                        Shop
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Cream Mango
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Dutch Chocolate
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Ruby Pomegranate
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                        Support
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="#"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="hover:text-orange-400 transition-colors"
                            >
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Shipping &amp; Returns
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                        Stay Fresh
                    </h4>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-orange-400 w-full"
                        />
                        <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-orange-600 transition-colors">
                            ➔
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
                © {new Date().getFullYear()} Nano Banana Inc. All rights reserved.
            </div>
        </footer>
    );
}
