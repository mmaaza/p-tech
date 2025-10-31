import { useParams, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import { Heart, Brain, Activity, Shield, Baby } from 'lucide-react'

const MonthPage = () => {
  const { month } = useParams<{ month: string }>()
  const location = useLocation()
  const user = location.state?.user


  const monthData = {
    '1': {
      title: 'Month 1 - Early Development',
      subtitle: 'Conception and Implantation',
      description: 'The first month of pregnancy is a critical period where conception occurs and the embryo implants in the uterus.',
      keyDevelopments: [
        'Fertilization occurs when sperm meets egg',
        'The fertilized egg travels down the fallopian tube',
        'Implantation in the uterine wall begins',
        'Early cell division and growth starts',
        'Pregnancy hormones begin to be produced'
      ],
      symptoms: [
        'Missed period',
        'Light spotting or cramping',
        'Breast tenderness',
        'Fatigue',
        'Nausea (morning sickness may begin)'
      ],
      tips: [
        'Start taking prenatal vitamins with folic acid',
        'Avoid alcohol, smoking, and harmful substances',
        'Schedule your first prenatal appointment',
        'Maintain a healthy diet',
        'Get adequate rest and sleep'
      ]
    },
    '2': {
      title: 'Month 2 - Neural Development',
      subtitle: 'Brain and Nervous System Formation',
      description: 'During the second month, your baby\'s neural tube develops into the brain and spinal cord, and major organs begin to form.',
      keyDevelopments: [
        'Neural tube closes and brain development begins',
        'Heart starts beating around week 6',
        'Limb buds appear for arms and legs',
        'Facial features begin to form',
        'Major organs start developing'
      ],
      symptoms: [
        'Morning sickness may intensify',
        'Increased breast tenderness',
        'Frequent urination',
        'Food aversions or cravings',
        'Mood changes due to hormones'
      ],
      tips: [
        'Continue prenatal vitamins',
        'Stay hydrated and eat small, frequent meals',
        'Avoid raw or undercooked foods',
        'Get regular gentle exercise',
        'Discuss any medications with your doctor'
      ]
    },
    '3': {
      title: 'Month 3 - Organ Formation',
      subtitle: 'Major Organs Begin to Develop',
      description: 'The third month marks the end of the first trimester. Your baby\'s organs continue to develop and mature.',
      keyDevelopments: [
        'All major organs are present',
        'Fingers and toes are well-defined',
        'Baby can make fists and move',
        'Reproductive organs begin to develop',
        'Baby is about 3 inches long'
      ],
      symptoms: [
        'Morning sickness may start to improve',
        'Energy levels may increase',
        'Visible weight gain begins',
        'Skin changes may occur',
        'Emotional changes continue'
      ],
      tips: [
        'Consider genetic screening tests',
        'Maintain a balanced diet with protein',
        'Start thinking about maternity clothes',
        'Continue regular prenatal appointments',
        'Stay active with approved exercises'
      ]
    },
    '4': {
      title: 'Month 4 - Second Trimester',
      subtitle: 'Movement and Growth Acceleration',
      description: 'Welcome to the second trimester! Many women feel their best during this period as morning sickness often subsides.',
      keyDevelopments: [
        'Baby\'s movements become more coordinated',
        'Facial features are more defined',
        'Baby can hear sounds from outside',
        'Skeleton begins to harden',
        'Baby is about 6 inches long'
      ],
      symptoms: [
        'Increased energy levels',
        'Reduced nausea',
        'Growing belly becomes noticeable',
        'Possible skin changes (pregnancy glow)',
        'May feel first baby movements'
      ],
      tips: [
        'Consider announcing your pregnancy',
        'Start planning for maternity leave',
        'Continue healthy eating habits',
        'Consider prenatal classes',
        'Stay hydrated and get adequate rest'
      ]
    },
    '5': {
      title: 'Month 5 - Halfway Point',
      subtitle: 'Gender Determination Possible',
      description: 'You\'re halfway through your pregnancy! This is often when you can find out your baby\'s gender through ultrasound.',
      keyDevelopments: [
        'Baby\'s gender may be visible on ultrasound',
        'Hair and nails begin to grow',
        'Baby develops sleep and wake cycles',
        'Muscles and bones continue strengthening',
        'Baby is about 10 inches long'
      ],
      symptoms: [
        'Definite baby movements (quickening)',
        'Continued energy and well-being',
        'Growing belly and weight gain',
        'Possible heartburn or indigestion',
        'Skin stretching and possible stretch marks'
      ],
      tips: [
        'Schedule anatomy scan ultrasound',
        'Start thinking about baby names',
        'Consider creating a birth plan',
        'Begin researching childcare options',
        'Take progress photos of your growing belly'
      ]
    },
    '6': {
      title: 'Month 6 - Rapid Growth',
      subtitle: 'Lung Development and Weight Gain',
      description: 'Your baby is growing rapidly and developing important systems like the lungs and immune system.',
      keyDevelopments: [
        'Lungs begin producing surfactant',
        'Baby\'s movements become stronger',
        'Eyes begin to open',
        'Brain development accelerates',
        'Baby is about 12 inches long'
      ],
      symptoms: [
        'More pronounced baby movements',
        'Possible back pain from growing belly',
        'Shortness of breath',
        'Leg cramps',
        'Possible swelling in feet and ankles'
      ],
      tips: [
        'Practice good posture to reduce back pain',
        'Wear comfortable, supportive shoes',
        'Consider prenatal massage',
        'Start preparing the nursery',
        'Discuss birth preferences with your doctor'
      ]
    },
    '7': {
      title: 'Month 7 - Third Trimester',
      subtitle: 'Brain Development and Fat Storage',
      description: 'Welcome to the third trimester! Your baby\'s brain is developing rapidly and they\'re storing fat for warmth.',
      keyDevelopments: [
        'Brain tissue develops rapidly',
        'Baby begins storing fat',
        'Hearing is fully developed',
        'Baby\'s movements are more restricted due to size',
        'Baby is about 14 inches long'
      ],
      symptoms: [
        'Increased fatigue',
        'More frequent urination',
        'Braxton Hicks contractions may begin',
        'Difficulty sleeping',
        'Possible mood changes'
      ],
      tips: [
        'Start childbirth education classes',
        'Create a hospital bag checklist',
        'Discuss pain management options',
        'Consider writing a birth plan',
        'Get adequate rest when possible'
      ]
    },
    '8': {
      title: 'Month 8 - Final Preparations',
      subtitle: 'Organ Maturation and Positioning',
      description: 'Your baby\'s organs are maturing and they\'re getting into position for birth. You\'re in the home stretch!',
      keyDevelopments: [
        'Organs continue to mature',
        'Baby may move into head-down position',
        'Bones harden except for the skull',
        'Baby practices breathing movements',
        'Baby is about 18 inches long'
      ],
      symptoms: [
        'Increased discomfort',
        'More frequent Braxton Hicks contractions',
        'Difficulty finding comfortable positions',
        'Possible nesting instincts',
        'Increased anxiety about labor'
      ],
      tips: [
        'Pack your hospital bag',
        'Finalize birth plan and preferences',
        'Install car seat and have it inspected',
        'Stock up on baby essentials',
        'Practice relaxation techniques'
      ]
    },
    '9': {
      title: 'Month 9 - Birth Preparation',
      subtitle: 'Full Term and Delivery Readiness',
      description: 'Your baby is considered full-term and ready for birth! Your body is preparing for labor and delivery.',
      keyDevelopments: [
        'Baby is fully developed and ready for birth',
        'Baby may drop lower into pelvis',
        'Lungs are mature and ready for breathing',
        'Baby has strong reflexes',
        'Average weight is 6-9 pounds'
      ],
      symptoms: [
        'Increased pelvic pressure',
        'More frequent and intense contractions',
        'Possible loss of mucus plug',
        'Nesting instincts may intensify',
        'Anticipation and excitement about meeting baby'
      ],
      tips: [
        'Know the signs of labor',
        'Have your support team on standby',
        'Rest as much as possible',
        'Stay close to home',
        'Trust your body and the process'
      ]
    }
  }

  const currentMonth = monthData[month as keyof typeof monthData] || monthData['1']

  return (
    <div className="min-h-screen medical-hero">
      <Header 
        user={user} 
        showBackButton={true}
        backPath="/dashboard"
        subtitle={`Month ${month}`}
      />

      {/* Main Content */}
      <main className="medical-container px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Overview */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl medical-gradient">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
            <div className="relative px-8 py-12 md:px-12 md:py-16">
              <div className="max-w-5xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {currentMonth.title}
                    </h1>
                    <div className="flex items-center space-x-3">
                      <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <span className="text-white font-medium text-lg">{currentMonth.subtitle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <p className="text-xl text-white/95 leading-relaxed">
                      {currentMonth.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-white text-sm font-medium">Month {month}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-white text-sm font-medium">Development</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        <span className="text-white text-sm font-medium">Health Tips</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl transform rotate-2"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-accent rounded-full"></div>
                            <span className="text-white font-medium">Month {month} Highlights</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-sm">Key Developments</span>
                              <span className="text-accent font-semibold">{currentMonth.keyDevelopments.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-sm">Common Symptoms</span>
                              <span className="text-accent font-semibold">{currentMonth.symptoms.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-sm">Health Tips</span>
                              <span className="text-accent font-semibold">{currentMonth.tips.length}</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/20">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">{month}</div>
                              <div className="text-xs text-white/70">Month of Pregnancy</div>
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

        {/* Month Details */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="medical-card border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg medical-text-primary">Key Developments</CardTitle>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm medical-text-muted">{currentMonth.keyDevelopments.length} key points</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-3">
                {currentMonth.keyDevelopments.map((development, index) => (
                  <li key={index} className="flex items-start space-x-3 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:bg-accent transition-colors"></div>
                    <span className="text-sm medical-text-secondary leading-relaxed">{development}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="medical-card border-0 bg-gradient-to-br from-accent/5 to-primary/5 hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Activity className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg medical-text-primary">Common Symptoms</CardTitle>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm medical-text-muted">{currentMonth.symptoms.length} symptoms</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-3">
                {currentMonth.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start space-x-3 group/item">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 group-hover/item:bg-primary transition-colors"></div>
                    <span className="text-sm medical-text-secondary leading-relaxed">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="medical-card border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg medical-text-primary">Health Tips</CardTitle>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm medical-text-muted">{currentMonth.tips.length} helpful tips</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-3">
                {currentMonth.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:bg-accent transition-colors"></div>
                    <span className="text-sm medical-text-secondary leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Section */}
        <Card className="medical-card border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Baby className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl medical-text-primary">AI Pregnancy Assistant</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm medical-text-muted">Powered by AI</span>
                </div>
              </div>
            </div>
            <CardDescription className="text-lg medical-text-secondary leading-relaxed">
              Chat with our AI assistant for personalized guidance and answers to your pregnancy questions for Month {month}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium medical-text-primary mb-2">
                    Instructions for embedding your HuggingFace bot:
                  </p>
                  <p className="text-xs medical-text-muted leading-relaxed">
                    Replace the placeholder below with your HuggingFace iframe embed code. 
                    The iframe should have width="100%" and height="600px" for optimal display.
                  </p>
                </div>
              </div>
            </div>
            
            {/* HuggingFace AI Assistant Iframe */}
            <div className="relative w-full flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-gray-50/50 border medical-border">
              <iframe
                src={`https://hashirehtisham-pregnitech-month-${month}.hf.space`}
                frameBorder="0"
                width="850"
                height="450"
                className="w-full max-w-full h-[650px] md:h-[700px] rounded-xl"
                title={`PregniTech Month ${month} AI Assistant`}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default MonthPage
