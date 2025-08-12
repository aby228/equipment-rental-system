import { ArrowLeft, Calendar, Clock, User, Zap, Fuel, DollarSign, Leaf, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function ElectricVsDieselEquipment() {
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
        <Badge className="mb-4 bg-green-100 text-green-800">Technology</Badge>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Electric vs Diesel: The Future of Construction Equipment
        </h1>
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">Equipment Specialist</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>February 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>7 min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/Electric vs Diesel.699Z.png"
          alt="Electric vs Diesel Construction Equipment"
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          The construction industry is at a pivotal moment as electric equipment challenges traditional diesel-powered machinery. This comprehensive analysis explores the advantages, challenges, and future implications of this technological shift in construction equipment rental.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-green-600" />
          The Electric Revolution
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Electric construction equipment is rapidly gaining market share, driven by environmental regulations, cost savings, and technological advancements. Major manufacturers like Caterpillar, Komatsu, and Volvo are investing billions in electric equipment development.
        </p>

        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Electric Equipment Advantages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Environmental Benefits
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Zero emissions during operation</li>
                <li>• Reduced noise pollution</li>
                <li>• Lower carbon footprint</li>
                <li>• Compliance with urban regulations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Cost Benefits
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 40-60% lower operating costs</li>
                <li>• Reduced fuel expenses</li>
                <li>• Lower maintenance requirements</li>
                <li>• Extended equipment lifespan</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Fuel className="w-8 h-8 text-orange-600" />
          Diesel Equipment: The Traditional Choice
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Diesel equipment remains the dominant choice for many construction applications due to its proven reliability, power output, and established infrastructure. However, it faces increasing pressure from environmental regulations and rising fuel costs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Diesel Equipment Strengths</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High power output and torque</li>
                <li>• Long operating range</li>
                <li>• Proven reliability</li>
                <li>• Established service network</li>
                <li>• Lower initial purchase cost</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Diesel Equipment Challenges</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High fuel costs and volatility</li>
                <li>• Emissions and environmental impact</li>
                <li>• Noise pollution in urban areas</li>
                <li>• Regulatory restrictions</li>
                <li>• Maintenance complexity</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Cost Comparison Analysis</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Understanding the total cost of ownership is crucial for making informed decisions about equipment rental and purchase.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Total Cost of Ownership Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Electric Equipment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Initial Cost:</span>
                  <span className="font-semibold text-red-600">+30-50%</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel/Energy Cost:</span>
                  <span className="font-semibold text-green-600">-60%</span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance Cost:</span>
                  <span className="font-semibold text-green-600">-40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Environmental Compliance:</span>
                  <span className="font-semibold text-green-600">No Cost</span>
                </div>
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total Savings (3 years):</span>
                    <span className="text-green-600">$45,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Diesel Equipment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Initial Cost:</span>
                  <span className="font-semibold text-green-600">Baseline</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel Cost:</span>
                  <span className="font-semibold text-red-600">+100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance Cost:</span>
                  <span className="font-semibold text-red-600">+100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Environmental Compliance:</span>
                  <span className="font-semibold text-red-600">+$5,000/year</span>
                </div>
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total Cost (3 years):</span>
                    <span className="text-red-600">$45,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Performance Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Settings className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-display font-semibold text-gray-900 mb-2">Power Output</h4>
              <p className="text-sm text-gray-600 mb-3">Electric equipment matches or exceeds diesel performance in most applications</p>
              <div className="text-2xl font-bold text-green-600">95%</div>
              <p className="text-xs text-gray-500">of diesel power output</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-display font-semibold text-gray-900 mb-2">Operating Time</h4>
              <p className="text-sm text-gray-600 mb-3">Battery technology limitations vs continuous diesel operation</p>
              <div className="text-2xl font-bold text-orange-600">6-8 hrs</div>
              <p className="text-xs text-gray-500">vs 12+ hours diesel</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-display font-semibold text-gray-900 mb-2">Efficiency</h4>
              <p className="text-sm text-gray-600 mb-3">Electric motors are inherently more efficient than combustion engines</p>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <p className="text-xs text-gray-500">vs 35% diesel efficiency</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Market Adoption Trends</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The construction industry is witnessing a gradual but steady shift towards electric equipment, with adoption rates varying by region and application.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Current Adoption Rates by Equipment Type</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Compact Excavators</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
                <span className="text-sm font-semibold">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Mini Loaders</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '28%'}}></div>
                </div>
                <span className="text-sm font-semibold">28%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Tower Cranes</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                <span className="text-sm font-semibold">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Heavy Excavators</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '8%'}}></div>
                </div>
                <span className="text-sm font-semibold">8%</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Infrastructure and Support</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The transition to electric equipment requires significant infrastructure development and support systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Charging Infrastructure</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• On-site charging stations</li>
                <li>• Fast-charging capabilities</li>
                <li>• Mobile charging solutions</li>
                <li>• Grid integration requirements</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-display font-semibold text-gray-900 mb-3">Service and Support</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Specialized technician training</li>
                <li>• Battery management systems</li>
                <li>• Software updates and diagnostics</li>
                <li>• Warranty and support programs</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Future Outlook</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The construction equipment industry is rapidly evolving, with electric equipment expected to dominate certain market segments within the next decade.
        </p>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white mb-8">
          <h3 className="text-2xl font-display font-bold mb-4">Projected Market Share by 2030</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">60%</div>
              <p className="text-sm">Compact Equipment</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">40%</div>
              <p className="text-sm">Medium Equipment</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">20%</div>
              <p className="text-sm">Heavy Equipment</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">Key Factors Driving Adoption</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Regulatory Pressure</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Stricter emissions standards</li>
                <li>• Urban construction restrictions</li>
                <li>• Carbon reduction targets</li>
                <li>• Noise pollution regulations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Economic Factors</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rising fuel costs</li>
                <li>• Lower operating expenses</li>
                <li>• Government incentives</li>
                <li>• Total cost advantages</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-display font-bold mb-4">Make the Right Choice</h3>
          <p className="text-blue-100 mb-6">
            Whether you choose electric or diesel equipment, our team can help you find the perfect solution for your construction needs. Contact us to discuss your requirements and explore our equipment options.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              Browse Equipment Options
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 