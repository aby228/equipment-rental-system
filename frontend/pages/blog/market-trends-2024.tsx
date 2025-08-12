import { ArrowLeft, Calendar, Clock, User, TrendingUp, Zap, Leaf, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function MarketTrends2024() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <Badge className="mb-4 bg-blue-100 text-blue-800">Industry Insights</Badge>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          2024 Construction Equipment Rental Market Trends
        </h1>
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">Industry Analyst</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>March 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/2024 Construction Equipment Rental Market Trends.023Z.png"
          alt="Construction Equipment Rental Market Trends"
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          The construction equipment rental industry is experiencing unprecedented transformation in 2024, driven by technological innovation, sustainability demands, and evolving market dynamics. This comprehensive analysis explores the key trends shaping the future of equipment rental.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          Market Growth and Expansion
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The global construction equipment rental market is projected to reach $140 billion by 2025, growing at a CAGR of 4.5%. This growth is fueled by increasing infrastructure development, urbanization, and the rising preference for rental over ownership among construction companies.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Key Market Drivers</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Infrastructure development projects worldwide</li>
            <li>• Cost-effective alternative to equipment ownership</li>
            <li>• Reduced maintenance and storage costs</li>
            <li>• Access to latest technology without capital investment</li>
          </ul>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-green-600" />
          Electric Equipment Revolution
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Electric construction equipment is rapidly gaining traction, with major manufacturers investing heavily in battery-powered alternatives. Electric excavators, loaders, and compact equipment are becoming increasingly popular due to their lower operating costs and environmental benefits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-2">Electric Equipment Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 40-60% lower operating costs</li>
                <li>• Zero emissions and reduced noise</li>
                <li>• Lower maintenance requirements</li>
                <li>• Improved operator comfort</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-2">Market Adoption</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 25% increase in electric equipment rentals</li>
                <li>• Growing demand in urban construction</li>
                <li>• Government incentives driving adoption</li>
                <li>• Major rental companies expanding electric fleets</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Leaf className="w-8 h-8 text-green-600" />
          Sustainability and Green Construction
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Environmental regulations and corporate sustainability goals are driving demand for eco-friendly construction equipment. Rental companies are responding by expanding their fleets with fuel-efficient and electric equipment options.
        </p>

        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Sustainability Initiatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Carbon Reduction</h4>
              <p className="text-gray-600">Companies targeting 30% reduction in carbon footprint through electric equipment adoption</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Fuel Efficiency</h4>
              <p className="text-gray-600">Advanced engine technology reducing fuel consumption by 15-20%</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Waste Reduction</h4>
              <p className="text-gray-600">Improved equipment lifecycle management and recycling programs</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          Technology Integration and IoT
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The integration of Internet of Things (IoT) technology is revolutionizing equipment rental operations. Smart sensors, GPS tracking, and predictive maintenance systems are improving efficiency and reducing downtime.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Technology Trends</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">Telematics and GPS Tracking</h4>
              <p className="text-gray-600">Real-time monitoring of equipment location, usage, and performance metrics</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Predictive Maintenance</h4>
              <p className="text-gray-600">AI-powered systems predicting equipment failures before they occur</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Digital Platforms</h4>
              <p className="text-gray-600">Online booking systems and mobile apps streamlining rental processes</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Regional Market Analysis</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Different regions are experiencing varying growth patterns based on local infrastructure needs and economic conditions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">North America</h4>
              <p className="text-gray-600 mb-3">Leading market with strong infrastructure investment and technology adoption</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 35% market share</li>
                <li>• High adoption of electric equipment</li>
                <li>• Advanced telematics integration</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Asia-Pacific</h4>
              <p className="text-gray-600 mb-3">Fastest growing region with rapid urbanization and infrastructure development</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 8.2% CAGR expected</li>
                <li>• Large-scale infrastructure projects</li>
                <li>• Increasing rental penetration</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Future Outlook</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The construction equipment rental industry is poised for continued growth and innovation. Key factors driving future success include:
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Automation and Robotics:</strong> Increasing adoption of autonomous equipment for repetitive tasks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Circular Economy:</strong> Equipment refurbishment and remanufacturing gaining importance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Data Analytics:</strong> Advanced analytics driving operational efficiency and customer insights</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Partnership Models:</strong> Strategic alliances between manufacturers and rental companies</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-display font-bold mb-4">Stay Ahead of the Curve</h3>
          <p className="text-blue-100 mb-6">
            Keep up with the latest industry trends and insights by subscribing to our newsletter and following our blog for regular updates on construction equipment rental market developments.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              Explore Our Equipment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 