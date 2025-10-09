import React, { useEffect, useState } from 'react';
import { Box, ChevronRight, Code, Download, Github, Rocket, Shield, Star, Zap, Package, Calendar, Tag } from 'lucide-react';

function LatestVersion() {
    const [version, setVersion] = React.useState("");

    React.useEffect(() => {
        fetch("https://api.github.com/repos/Sandro642/ConnectLib/tags")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setVersion(data[0].name);
                } else {
                    setVersion("No tags found");
                }
            })
            .catch(() => setVersion("Error"));
    }, []);

    return <span>{version || "loading..."}</span>;
}

function DownloadsSection() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/Sandro642/ConnectLib/tags');
                const data = await response.json();

                const formattedTags = data.map((tag, index) => ({
                    id: index + 1,
                    name: tag.name,
                    version: tag.name,
                    zipball_url: tag.zipball_url,
                    tarball_url: tag.tarball_url,
                    commit: tag.commit,
                    jarUrl: `https://sandro642.github.io/connectlib/jar/fr/sandro642/github/ConnectLib/${tag.name}/ConnectLib-${tag.name}.jar`
                }));

                setTags(formattedTags);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.version.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
    const displayedTags = filteredTags.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <div id="downloads" className="relative py-20 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Download <span className="text-cyan-400">ConnectLib</span>
                </h2>
                <p className="text-center text-gray-400 mb-12 text-lg">
                    All available versions and releases
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search releases..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Tags Grid */}
                {!selectedTag ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {displayedTags.map((tag) => (
                                <div
                                    key={tag.id}
                                    onClick={() => setSelectedTag(tag)}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Package className="w-5 h-5 text-cyan-400" />
                                            <span className="font-bold text-lg text-cyan-400">#{tag.id}</span>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-400/30">
                                            {tag.version}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-4 text-white">{tag.name}</h3>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTag(tag);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all"
                                        >
                                            <Code className="w-4 h-4" />
                                            <span className="font-medium text-sm">Import</span>
                                        </button>
                                        <a
                                            href={`https://github.com/Sandro642/ConnectLib/releases/tag/${tag.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {filteredTags.length > itemsPerPage && (
                            <div className="flex justify-center items-center gap-2 mb-6">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Previous
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`px-4 py-2 rounded-lg transition-all ${
                                                currentPage === index + 1
                                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* Results Info */}
                        <div className="text-center text-gray-400 text-sm">
                            Showing <span className="text-white font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-white font-semibold">{Math.min(currentPage * itemsPerPage, filteredTags.length)}</span> of{' '}
                            <span className="text-white font-semibold">{filteredTags.length}</span> releases
                        </div>
                    </>
                ) : (
                    /* Tag Details View */
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            <span>Back to all versions</span>
                        </button>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2">{selectedTag.name}</h3>
                                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-400/30">
                                        Version {selectedTag.version}
                                    </span>
                                </div>
                            </div>

                            {/* Gradle Import */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-lg font-bold flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                        Gradle Import
                                    </h4>
                                    <button
                                        onClick={() => copyToClipboard(`repositories {
    maven {
        url = "https://sandro642.github.io/connectlib/jar"
    }
}

dependencies {
    implementation 'fr.sandro642.github:ConnectLib:${selectedTag.version}'
}`)}
                                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <pre className="text-sm text-gray-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`repositories {
    maven {
        url = "https://sandro642.github.io/connectlib/jar"
    }
}

dependencies {
    implementation 'fr.sandro642.github:ConnectLib:${selectedTag.version}'
}`}
                                </pre>
                            </div>

                            {/* Maven Import */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-lg font-bold flex items-center gap-2">
                                        <Code className="w-5 h-5 text-cyan-400" />
                                        Maven Import
                                    </h4>
                                    <button
                                        onClick={() => copyToClipboard(`<repository>
    <id>connectlib</id>
    <url>https://sandro642.github.io/connectlib/jar</url>
</repository>

<dependency>
    <groupId>fr.sandro642.github</groupId>
    <artifactId>ConnectLib</artifactId>
    <version>${selectedTag.version}</version>
</dependency>`)}
                                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <pre className="text-sm text-gray-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`<repository>
    <id>connectlib</id>
    <url>https://sandro642.github.io/connectlib/jar</url>
</repository>

<dependency>
    <groupId>fr.sandro642.github</groupId>
    <artifactId>ConnectLib</artifactId>
    <version>${selectedTag.version}</version>
</dependency>`}
                                </pre>
                            </div>

                            {/* Download Links */}
                            <div>
                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                    <Download className="w-5 h-5 text-green-400" />
                                    Direct Downloads
                                </h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <a
                                        href={selectedTag.jarUrl}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="font-medium">Download JAR</span>
                                    </a>
                                    <a
                                        href={selectedTag.zipball_url}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="font-medium">Download ZIP</span>
                                    </a>
                                    <a
                                        href={selectedTag.tarball_url}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="font-medium">Download TAR</span>
                                    </a>
                                    <a
                                        href={`https://github.com/Sandro642/ConnectLib/releases/tag/${selectedTag.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span className="font-medium">View on GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ConnectLibLanding() {
    const [scrollY, setScrollY] = useState(0);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 6);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        { icon: <Box className="w-6 h-6"/>, title: "Centralized Management", desc: "All your API's Rest in one Lib" },
        { icon: <Zap className="w-6 h-6"/>, title: "Automated Execution", desc: "Asynchronous jobs without blocking" },
        { icon: <Code className="w-6 h-6"/>, title: "Extensible & Modular", desc: "Architecture designed to evolve" },
        { icon: <Shield className="w-6 h-6"/>, title: "Built-in Security", desc: "Native protection of your data" },
        { icon: <Rocket className="w-6 h-6"/>, title: "Optimal Performance", desc: "Java 23 and Projet Reactor" },
        { icon: <Star className="w-6 h-6"/>, title: "Detailed Logs", desc: "Complete monitoring of your flows" }
    ];

    const codeExample = `// Initialization with enum
public enum RouteList implements EnumLoader.RouteImport {
   VERSION("/api/mcas/info/version"),
   INFO("/api/mcas/info/info");

   String route;
   TestRoutes(String route) { this.route = route; }
   
   @Override
   public String route() { return route; }
}

private final ConnectLib connectLib = new ConnectLib();

connectLib.Init(ResourceType.MAIN_RESOURCES, LangType.ENGLISH, RouteList.class);`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"/>
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"/>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"/>
            </div>

            {/* Hero Section */}
            <div className="relative">
                <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        ConnectLib
                    </div>
                    <div className="flex gap-2">
                        <a href="https://github.com/Sandro642/ConnectLib" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                            <Github className="w-5 h-5"/>
                            <span>GitHub</span>
                        </a>
                        <a href="https://github.com/Sandro642/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                            <Github className="w-5 h-5"/>
                            <span>Profile</span>
                        </a>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-20 md:py-32">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                            <span className="text-blue-300">
                                ✨ Version <LatestVersion/>
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            The Universal Gateway
                            <br/>
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                                For Your Data Flows
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                            Connecting, automating, and orchestrating has never been easier.
                            <br/>
                            <span className="text-cyan-400">Like playing with Lego.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="#downloads" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 flex items-center gap-2">
                                <Download className="w-5 h-5"/>
                                <span className="font-semibold">Get Started Now</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                            </a>

                            <a href="#features" className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20">
                                <span className="font-semibold">Discover Features</span>
                            </a>
                        </div>

                        <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                                <span>Java 23</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
                                <span>Hook Manager</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"/>
                                <span>LangType 2.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="relative py-20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Why <span className="text-cyan-400">ConnectLib</span>?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer ${activeFeature === index ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400/50 scale-105 shadow-xl shadow-blue-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`} onMouseEnter={() => setActiveFeature(index)}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${activeFeature === index ? 'bg-blue-500 scale-110' : 'bg-white/10'}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Downloads Section */}
            <DownloadsSection />

            {/* Code Example */}
            <div className="relative py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
                            Simple & <span className="text-cyan-400">Powerful</span>
                        </h2>
                        <p className="text-center text-gray-400 mb-12 text-lg">
                            Start in just a few lines of code
                        </p>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"/>
                            <div className="relative bg-slate-900 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500"/>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                                    <div className="w-3 h-3 rounded-full bg-green-500"/>
                                    <span className="ml-4 text-gray-500 text-sm">Example.java</span>
                                </div>
                                <pre className="text-sm text-cyan-300 overflow-x-auto">
                                    <code>{codeExample}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative py-20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8">
                            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                <LatestVersion/>
                            </div>
                            <div className="text-gray-400">Stable Version</div>
                        </div>
                        <div className="p-8">
                            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                Java 23
                            </div>
                            <div className="text-gray-400">Latest Support</div>
                        </div>
                        <div className="p-8">
                            <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                                2.0
                            </div>
                            <div className="text-gray-400">LangType</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Connect the Impossible?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Join developers who chose ConnectLib to simplify their integrations
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://github.com/Sandro642/ConnectLib" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
                                <Github className="w-5 h-5"/>
                                <span className="font-semibold">View on GitHub</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                            </a>
                            <a href="mailto:sandro33810@gmail.com" className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20">
                                <span className="font-semibold">Contact Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            ConnectLib. The freedom to connect the impossible...
                        </div>
                        <div className="flex gap-4">
                            <a href="https://github.com/Sandro642/ConnectLib" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                <Github className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 text-sm mt-8">
                        © 2025 ConnectLib. Made with ❤️ by Sandro642
                    </div>
                </div>
            </footer>
        </div>
    );
}