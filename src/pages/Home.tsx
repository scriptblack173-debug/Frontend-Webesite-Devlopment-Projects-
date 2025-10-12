import { Link } from 'react-router-dom';
import { Languages, Sparkles, ArrowRight, Zap, Shield, Layers } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Languages,
      title: 'Language Translator',
      description: 'Translate text into multiple languages instantly with AI-powered accuracy',
      path: '/translator',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'Random String Generator',
      description: 'Generate secure random strings with customizable options for your projects',
      path: '/generator',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { icon: Zap, label: 'Lightning Fast', value: 'Instant Results' },
    { icon: Shield, label: 'Secure', value: '100% Safe' },
    { icon: Layers, label: 'Modern Stack', value: 'React + Vite' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>

        <div className="absolute top-1/4 left-1/3">
          <div className="animate-float">
            <Languages className="w-16 h-16 text-blue-500/20" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4">
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-20 h-20 text-cyan-500/20" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <div className="animate-float" style={{ animationDelay: '2s' }}>
            <Zap className="w-14 h-14 text-purple-500/20" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <div className="animate-float" style={{ animationDelay: '3s' }}>
            <Shield className="w-16 h-16 text-pink-500/20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Professional Developer Tools</span>
          </div>

          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text animate-gradient">
            Welcome to DevToolkit
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one suite of powerful development utilities. Built with modern technologies
            to streamline your workflow and boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:border-cyan-500/50"
              >
                <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.path}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="inline-flex items-center space-x-2 text-cyan-400 font-medium group-hover:space-x-4 transition-all">
                  <span>Explore Tool</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Start using our powerful tools today and experience the difference in your workflow.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/translator"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              Try Translator
            </Link>
            <Link
              to="/generator"
              className="px-8 py-4 bg-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-slate-600"
            >
              Try Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
