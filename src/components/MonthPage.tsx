import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Baby, Heart, Brain, Activity, Shield } from 'lucide-react'

const MonthPage = ({ month, onBack, user }) => {
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

  const currentMonth = monthData[month] || monthData['1']

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Baby className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-700">PREGNITECH</h1>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Month {month}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome, {user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center space-x-2">
                <Heart className="h-8 w-8" />
                <span>{currentMonth.title}</span>
              </CardTitle>
              <CardDescription className="text-purple-100 text-lg">
                {currentMonth.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-lg">
                {currentMonth.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Month Details */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>Key Developments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentMonth.keyDevelopments.map((development, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{development}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-pink-600" />
                <span>Common Symptoms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentMonth.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Health Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentMonth.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Baby className="h-6 w-6 text-purple-600" />
              <span>AI Pregnancy Assistant</span>
            </CardTitle>
            <CardDescription>
              Chat with our AI assistant for personalized guidance and answers to your pregnancy questions for Month {month}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Instructions for embedding your HuggingFace bot:</strong>
              </p>
              <p className="text-xs text-gray-500">
                Replace the placeholder below with your HuggingFace iframe embed code. 
                The iframe should have width="100%" and height="600px" for optimal display.
              </p>
            </div>
            
            {/* Iframe Space - This is where the HuggingFace bot will be embedded */}
            <div className="w-full h-[600px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Baby className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">HuggingFace AI Assistant</h3>
                <p className="text-sm text-gray-500 max-w-md">
                  This space is reserved for your HuggingFace chatbot iframe. 
                  Replace this placeholder with your actual iframe embed code.
                </p>
                <div className="mt-4 p-3 bg-white rounded border text-xs text-left">
                  <code className="text-gray-700">
                    {`<iframe
  src="your-huggingface-space-url"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default MonthPage

