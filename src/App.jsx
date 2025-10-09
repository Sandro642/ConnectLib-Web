import React, {useEffect, useState} from 'react';
import {Box, ChevronRight, Code, Download, Github, Rocket, Shield, Star, Zap} from 'lucide-react';

function LatestVersion() {
    const [version, setVersion] = React.useState("");

    React.useEffect(() => {
        fetch("https://api.github.com/repos/Sandro642/ConnectLib/tags")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setVersion(data[0].name); // le dernier tag
                } else {
                    setVersion("Aucun tag trouvé");
                }
            })
            .catch(() => setVersion("Erreur"));
    }, []);

    return <span>{version || "chargement..."}</span>;
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
        {
            icon: <Box className="w-6 h-6"/>,
            title: "Gestion Centralisée",
            desc: "Tous vos connecteurs en un seul endroit"
        },
        {icon: <Zap className="w-6 h-6"/>, title: "Exécution Automatisée", desc: "Jobs asynchrones sans blocage"},
        {icon: <Code className="w-6 h-6"/>, title: "Extensible & Modulaire", desc: "Architecture pensée pour évoluer"},
        {icon: <Shield className="w-6 h-6"/>, title: "Sécurité Intégrée", desc: "Protection native de vos données"},
        {icon: <Rocket className="w-6 h-6"/>, title: "Performance Optimale", desc: "Java 23 et architecture réactive"},
        {icon: <Star className="w-6 h-6"/>, title: "Logs Détaillés", desc: "Monitoring complet de vos flux"}
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
        <div
            className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 opacity-20">
                <div
                    className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"/>
                <div
                    className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"/>
                <div
                    className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"/>
            </div>

            {/* Hero Section */}
            <div className="relative">
                <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                    <div
                        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        ConnectLib
                    </div>
                    <div className="flex gap-2">
                        <a
                            href="https://github.com/Sandro642/ConnectLib"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                        >
                            <Github className="w-5 h-5"/>
                            <span>GitHub</span>
                        </a>

                        <a
                            href="https://github.com/Sandro642/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                        >
                            <Github className="w-5 h-5"/>
                            <span>Profil</span>
                        </a>
                    </div>

                </nav>

                <div className="container mx-auto px-6 py-20 md:py-32">
                    <div className="text-center max-w-5xl mx-auto">
                        <div
                            className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                            <span className="text-blue-300">
                                ✨ Version <LatestVersion/>
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            La Passerelle Universelle
                            <br/>
                            <span
                                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                                Pour Vos Flux de Données
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                            Connecter, automatiser et orchestrer n'a jamais été aussi simple.
                            <br/>
                            <span className="text-cyan-400">Comme jouer avec des Lego.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="https://github.com/Sandro642/ConnectLib"
                               className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 flex items-center gap-2">
                                <Download className="w-5 h-5"/>
                                <span className="font-semibold">Commencer Maintenant</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                            </a>

                            <a href="#features"
                               className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20">
                                <span className="font-semibold">Découvrir les Features</span>
                            </a>
                        </div>

                        <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                                <span>Java 23</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
                                <span>Minecraft 1.16+</span>
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
                        Pourquoi <span className="text-cyan-400">ConnectLib</span> ?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                                    activeFeature === index
                                        ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400/50 scale-105 shadow-xl shadow-blue-500/30'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                                        activeFeature === index ? 'bg-blue-500 scale-110' : 'bg-white/10'
                                    }`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div className="relative py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
                            Simple & <span className="text-cyan-400">Puissant</span>
                        </h2>
                        <p className="text-center text-gray-400 mb-12 text-lg">
                            Démarrez en quelques lignes de code
                        </p>

                        <div className="relative group">
                            <div
                                className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"/>
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

                        <div
                            className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 backdrop-blur-sm">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400"/>
                                Installation Gradle
                            </h3>
                            <pre className="text-sm text-gray-300 bg-black/30 p-4 rounded-lg mt-3">
{
    `
    repositories {
        maven {
            url = "https://sandro642.github.io/connectlib/jar"
        }
        
    }

    dependencies {
        implementation 'fr.sandro642.github:ConnectLib:0.3.4-STABLE'
    
    }

    `
}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative py-20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8">
                            <div
                                className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                <LatestVersion/>
                            </div>
                            <div className="text-gray-400">Version Stable</div>
                        </div>
                        <div className="p-8">
                            <div
                                className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                Java 23
                            </div>
                            <div className="text-gray-400">Support Latest</div>
                        </div>
                        <div className="p-8">
                            <div
                                className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
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
                            Prêt à Connecter l'Impossible ?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Rejoignez les développeurs qui ont choisi ConnectLib pour simplifier leurs intégrations
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://github.com/Sandro642/ConnectLib"
                               className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
                                <Github className="w-5 h-5"/>
                                <span className="font-semibold">Voir sur GitHub</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                            </a>
                            <a href="mailto:sandro33810@gmail.com"
                               className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20">
                                <span className="font-semibold">Nous Contacter</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div
                            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            ConnectLib. La liberté de connecter l'impossible...
                        </div>
                        <div className="flex gap-4">
                            <a href="https://github.com/Sandro642/ConnectLib"
                               className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
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
