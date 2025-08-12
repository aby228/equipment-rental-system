import { ArrowLeft, Calendar, Clock, User, Wifi, Shield, TrendingUp, Database, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function SmartEquipmentIoT() {
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
        <Badge className="mb-4 bg-purple-100 text-purple-800">Technology</Badge>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Smart Equipment: IoT and Telematics in Construction
        </h1>
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">Technology Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>January 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>6 min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/IoT Revolution.123Z.png"
          alt="Smart Equipment IoT and Telematics"
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          The construction industry is undergoing a digital transformation with the integration of Internet of Things (IoT) technology and telematics systems. This revolution is reshaping how equipment is monitored, maintained, and utilized, leading to unprecedented levels of efficiency and safety.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Wifi className="w-8 h-8 text-purple-600" />
          The IoT Revolution in Construction
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          IoT technology is transforming construction equipment from simple mechanical tools into intelligent, connected systems. Sensors, GPS tracking, and real-time data analytics are creating a new paradigm in equipment management and rental operations.
        </p>

        <div className="bg-purple-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Key IoT Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Sensors</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Engine performance monitoring</li>
                <li>• Fuel consumption tracking</li>
                <li>• Temperature and pressure sensors</li>
                <li>• Vibration and wear detection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">GPS and Location Tracking</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time location monitoring</li>
                <li>• Geofencing capabilities</li>
                <li>• Route optimization</li>
                <li>• Theft prevention systems</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          Telematics and Data Analytics
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Telematics systems collect and transmit real-time data from construction equipment, providing insights that drive operational efficiency and cost savings. This data is revolutionizing how rental companies manage their fleets and serve their customers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Database className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-display font-semibold text-gray-900 mb-2">Real-Time Monitoring</h4>
              <p className="text-sm text-gray-600 mb-3">Live tracking of equipment status, location, and performance metrics</p>
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <p className="text-xs text-gray-500">monitoring capability</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-display font-semibold text-gray-900 mb-2">Predictive Maintenance</h4>
              <p className="text-sm text-gray-600 mb-3">AI-powered systems predicting equipment failures before they occur</p>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <p className="text-xs text-gray-500">reduction in downtime</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-display font-semibold text-gray-900 mb-2">Mobile Integration</h4>
              <p className="text-sm text-gray-600 mb-3">Mobile apps providing instant access to equipment data and controls</p>
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <p className="text-xs text-gray-500">mobile accessibility</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Benefits for Equipment Rental</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          IoT and telematics technology is delivering significant advantages for equipment rental companies and their customers, from improved fleet management to enhanced customer service.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Operational Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Fleet Management</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time fleet visibility</li>
                <li>• Optimized equipment utilization</li>
                <li>• Automated scheduling systems</li>
                <li>• Reduced idle time</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer Service</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Proactive maintenance alerts</li>
                <li>• Usage analytics and reporting</li>
                <li>• Remote troubleshooting</li>
                <li>• Enhanced customer support</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Safety and Compliance</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Smart equipment technology is significantly improving safety standards and regulatory compliance in the construction industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Safety Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Operator behavior monitoring</li>
                <li>• Collision detection systems</li>
                <li>• Emergency shutdown capabilities</li>
                <li>• Real-time safety alerts</li>
                <li>• Fatigue detection systems</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Compliance Monitoring</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automated compliance reporting</li>
                <li>• Regulatory requirement tracking</li>
                <li>• Audit trail maintenance</li>
                <li>• Environmental impact monitoring</li>
                <li>• Certification management</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Cost Savings and ROI</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The implementation of IoT and telematics systems is delivering substantial cost savings and return on investment for construction companies and equipment rental providers.
        </p>

        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Financial Impact Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
              <p className="text-sm text-gray-600">Reduction in fuel costs through optimized usage</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
              <p className="text-sm text-gray-600">Decrease in maintenance costs with predictive maintenance</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
              <p className="text-sm text-gray-600">Improvement in equipment utilization rates</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Implementation Challenges</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          While the benefits of IoT and telematics are clear, implementation presents several challenges that organizations must address.
        </p>

        <div className="bg-orange-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Common Implementation Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technical Challenges</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Legacy equipment integration</li>
                <li>• Network connectivity issues</li>
                <li>• Data security concerns</li>
                <li>• System compatibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Organizational Challenges</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Staff training requirements</li>
                <li>• Change management</li>
                <li>• Initial investment costs</li>
                <li>• Data privacy regulations</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Future Trends and Innovations</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The future of smart equipment technology is promising, with several emerging trends set to further revolutionize the construction industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Emerging Technologies</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5G network integration</li>
                <li>• Edge computing capabilities</li>
                <li>• Artificial intelligence and machine learning</li>
                <li>• Blockchain for equipment tracking</li>
                <li>• Augmented reality for maintenance</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Market Predictions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 15% annual growth in IoT adoption</li>
                <li>• 80% of new equipment will be connected by 2025</li>
                <li>• $50 billion market value by 2027</li>
                <li>• Integration with autonomous vehicles</li>
                <li>• Advanced predictive analytics</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Best Practices for Implementation</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Successful implementation of IoT and telematics systems requires careful planning and adherence to proven best practices.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Implementation Strategy</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <div>
                <span className="font-semibold text-gray-900">Start Small:</span>
                <span className="text-gray-600"> Begin with a pilot program on a limited fleet to test and refine the system</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <div>
                <span className="font-semibold text-gray-900">Invest in Training:</span>
                <span className="text-gray-600"> Provide comprehensive training for operators and maintenance staff</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <div>
                <span className="font-semibold text-gray-900">Data Security:</span>
                <span className="text-gray-600"> Implement robust cybersecurity measures to protect sensitive equipment data</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <div>
                <span className="font-semibold text-gray-900">Scalable Solutions:</span>
                <span className="text-gray-600"> Choose systems that can grow with your business needs</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <div>
                <span className="font-semibold text-gray-900">Vendor Partnerships:</span>
                <span className="text-gray-600"> Work with experienced technology providers who understand construction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-display font-bold mb-4">Embrace the Future of Construction</h3>
          <p className="text-purple-100 mb-6">
            Smart equipment technology is not just a trend—it's the future of construction. Stay ahead of the curve by exploring our connected equipment solutions and learning how IoT can transform your operations.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
              Explore Smart Equipment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 