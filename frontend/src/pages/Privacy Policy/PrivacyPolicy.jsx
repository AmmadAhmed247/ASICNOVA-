import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Section with Blue Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-16 md:py-24">
                {/* Decorative Circle */}
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 translate-x-32 -translate-y-32"></div>

                <div className="relative mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                        At AsicNova, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect
                        your personal information when you visit or use our website.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-4xl px-6 py-12">
                <div className="mb-8">
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to <strong className="text-foreground">AsicNova</strong>. By using this site, you consent to the
                        practices outlined below.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Section 1 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>When you use our website or place an order, we may collect the following information:</p>

                            <div className="ml-4">
                                <h3 className="font-semibold text-foreground mb-2">Personal Information:</h3>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Billing/shipping address</li>
                                    <li>Phone number (if provided)</li>
                                </ul>
                            </div>

                            <div className="ml-4">
                                <h3 className="font-semibold text-foreground mb-2">Account Information (if you create an account):</h3>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Username and password</li>
                                    <li>Order history</li>
                                </ul>
                            </div>

                            <div className="ml-4">
                                <h3 className="font-semibold text-foreground mb-2">Order Details:</h3>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Product selections</li>
                                    <li>Payment method (crypto transaction details, not wallet private keys)</li>
                                </ul>
                            </div>

                            <div className="ml-4">
                                <h3 className="font-semibold text-foreground mb-2">Technical Data:</h3>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>IP address</li>
                                    <li>Browser type</li>
                                    <li>Device information</li>
                                    <li>Referring pages</li>
                                </ul>
                            </div>

                            <p className="font-medium text-foreground">
                                We do not collect or store credit card data or private crypto wallet keys.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>We use your information to:</p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Process and fulfill orders</li>
                                <li>Confirm payments and shipping</li>
                                <li>Provide customer support</li>
                                <li>Improve website experience</li>
                                <li>Send order status updates</li>
                                <li>Prevent fraud and secure your account</li>
                            </ul>
                            <p className="font-medium text-foreground">
                                We do not sell or rent your personal information to third parties.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies and Tracking</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Our site may use cookies and similar tracking technologies to enhance your browsing experience. These
                                cookies may:
                            </p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Remember your login session</li>
                                <li>Track website usage (via analytics)</li>
                                <li>Improve performance and personalization</li>
                            </ul>
                            <p>
                                You can disable cookies through your browser settings, but some features may not work properly without
                                them.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Crypto Payment Information</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                We accept payments in cryptocurrencies (BTC, ETH, ETC, etc.). While you'll provide a transaction ID or
                                hash for confirmation purposes, we do not collect, store, or access:
                            </p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Your private crypto keys</li>
                                <li>Wallet balances</li>
                                <li>Exchange account access</li>
                            </ul>
                            <p>All payment validations are done through public blockchain explorers.</p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Services</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>We may use the following third-party tools (subject to change):</p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Hosting services (e.g., Hostinger)</li>
                                <li>Email services (for notifications)</li>
                                <li>Analytics tools (e.g., Google Analytics)</li>
                            </ul>
                            <p>
                                These services may have access to limited user data for functionality purposes but are bound by their
                                own privacy agreements.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
                        </div>
                        <div className="text-muted-foreground leading-relaxed">
                            <p>
                                We retain user information for as long as necessary to fulfill your orders, comply with legal
                                obligations, or resolve disputes. You may request deletion of your account or data by contacting us.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Security Measures</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                We implement appropriate technical and organizational measures to safeguard your personal information,
                                including:
                            </p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>SSL encryption</li>
                                <li>Server-level protection</li>
                                <li>Strong password policies</li>
                            </ul>
                            <p>However, no method of transmission over the Internet is 100% secure.</p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Your Rights</h2>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>Depending on your jurisdiction, you may have rights to:</p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Access your data</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt out of marketing emails</li>
                            </ul>
                            <p>
                                To exercise any of these rights, contact us at:{" "}
                                <a href="mailto:contact@asicnova.com" className="text-blue-600 hover:underline">
                                    📧 contact@asicnova.com
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
                        </div>
                        <div className="text-muted-foreground leading-relaxed">
                            <p>
                                Our services are not directed at children under the age of 18. We do not knowingly collect personal
                                information from anyone under 18 years old.
                            </p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Policy Updates</h2>
                        </div>
                        <div className="text-muted-foreground leading-relaxed">
                            <p>
                                We reserve the right to update this Privacy Policy at any time. All changes will be posted on this page
                                with an updated effective date.
                            </p>
                        </div>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <div className="border-l-4 border-blue-500 pl-6 mb-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
                        </div>
                        <div className="text-muted-foreground leading-relaxed">
                            <p>For questions regarding this Privacy Policy, please contact:</p>
                            <div className="mt-4 space-y-2">
                                <p>
                                    <a href="mailto:contact@asicnova.com" className="text-blue-600 hover:underline">
                                        📧 contact@asicnova.com
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:sales@asicnova.com" className="text-blue-600 hover:underline">
                                        📧 sales@asicnova.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy