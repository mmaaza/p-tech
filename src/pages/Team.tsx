import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import { Users, Heart, Award, Sparkles, Github, Linkedin, Mail, ArrowLeft } from 'lucide-react'

const Team = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = location.state?.user

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Lead Medical Advisor",
      specialty: "Obstetrics & Gynecology",
      experience: "15+ years",
      description: "Board-certified OB/GYN with extensive experience in high-risk pregnancies and maternal-fetal medicine.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      skills: ["Prenatal Care", "High-Risk Pregnancy", "Maternal Health"],
      social: {
        linkedin: "#",
        email: "sarah@pregnitech.com"
      }
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "AI Research Director",
      specialty: "Medical AI & Machine Learning",
      experience: "12+ years",
      description: "PhD in Computer Science with focus on medical AI applications, specializing in pregnancy health monitoring.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      skills: ["AI Development", "Machine Learning", "Health Tech"],
      social: {
        github: "#",
        linkedin: "#",
        email: "michael@pregnitech.com"
      }
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Nutrition Specialist",
      specialty: "Prenatal Nutrition",
      experience: "10+ years",
      description: "Registered Dietitian specializing in prenatal and postnatal nutrition, helping mothers maintain optimal health.",
      image: "https://images.unsplash.com/photo-1594824373631-0b4a0b4a0b4a?w=400&h=400&fit=crop&crop=face",
      skills: ["Prenatal Nutrition", "Diet Planning", "Maternal Wellness"],
      social: {
        linkedin: "#",
        email: "emily@pregnitech.com"
      }
    }
  ]

  return (
    <div className="min-h-screen medical-hero">
      <Header 
        user={user} 
        subtitle="Meet Our Expert Team"
        showBackButton={!!user}
        backPath="/dashboard"
      />

      {/* Main Content */}
      <main className="medical-container px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Login Button - Only show when not logged in */}
        {!user && (
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Button>
          </div>
        )}
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl medical-gradient">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
            <div className="relative px-8 py-12 md:px-12 md:py-16">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      Our Expert Team
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="text-xl text-white/95 leading-relaxed">
                      Meet the medical professionals and AI experts behind PregniTech, 
                      dedicated to supporting your pregnancy journey.
                    </p>
                    <p className="text-lg text-white/85 leading-relaxed">
                      Our team combines decades of medical expertise with cutting-edge AI technology 
                      to provide you with the most comprehensive pregnancy support available.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-white text-sm font-medium">Medical Experts</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-white text-sm font-medium">AI Specialists</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        <span className="text-white text-sm font-medium">24/7 Support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl transform rotate-3"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-accent rounded-full"></div>
                            <span className="text-white font-medium">Team Expertise</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm text-white/80">
                              <span>Medical Professionals</span>
                              <span>3 Experts</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/80">
                              <span>Combined Experience</span>
                              <span>37+ years</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/80">
                              <span>Specializations</span>
                              <span>5+ Areas</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">15+</div>
                              <div className="text-xs text-white/70">Years Avg</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">100%</div>
                              <div className="text-xs text-white/70">Certified</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">24/7</div>
                              <div className="text-xs text-white/70">Available</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold medical-text-primary">Our Medical Team</h2>
                <p className="text-sm medical-text-muted">Expert professionals dedicated to your health</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card 
                key={member.id} 
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                
                <CardHeader className="relative pb-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <CardTitle className="text-xl font-bold medical-text-primary group-hover:text-primary transition-colors">
                        {member.name}
                      </CardTitle>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-primary">{member.role}</p>
                        <p className="text-xs medical-text-secondary">{member.specialty}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          <span className="text-xs medical-text-muted">{member.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative space-y-4">
                  <p className="text-sm medical-text-secondary leading-relaxed text-center">
                    {member.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 pt-2">
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin}
                          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-200"
                        >
                          <Linkedin className="h-4 w-4 text-primary" />
                        </a>
                      )}
                      {member.social.github && (
                        <a 
                          href={member.social.github}
                          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-200"
                        >
                          <Github className="h-4 w-4 text-primary" />
                        </a>
                      )}
                      {member.social.email && (
                        <a 
                          href={`mailto:${member.social.email}`}
                          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-200"
                        >
                          <Mail className="h-4 w-4 text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Values */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 hover:from-pink-100 hover:via-rose-100 hover:to-pink-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-110 transition-all duration-300">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                    Patient-Centered Care
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Every decision we make is guided by what's best for you and your baby's health and wellbeing.
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-pink-600">Compassionate</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
                  <span className="text-xs font-semibold text-pink-700">Caring</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 hover:from-pink-100 hover:via-rose-100 hover:to-pink-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-110 transition-all duration-300">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                    Innovation First
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                We leverage cutting-edge AI technology to provide personalized, evidence-based pregnancy guidance.
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-pink-600">Advanced</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
                  <span className="text-xs font-semibold text-pink-700">Smart</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 hover:from-rose-100 hover:via-pink-100 hover:to-red-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400/10 to-red-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg group-hover:shadow-rose-500/25 group-hover:scale-110 transition-all duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-rose-700 transition-colors duration-300">
                    Excellence
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-rose-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Our team maintains the highest standards of medical excellence and professional certification.
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-rose-600">Certified</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
                  <span className="text-xs font-semibold text-rose-700">Expert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Team
