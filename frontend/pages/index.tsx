import Carousel from '@/components/native/Carousel'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import ProductGrid from '@/components/native/ProductGrid'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import config from '@/config/site'

export default function HomePage() {
  const banners = ['/images/banners/Banner.295Z.png']

  const featuredProducts = [
    {
      id: '1',
      name: 'Welder Generator',
      description: 'Professional welding and power generation equipment for construction sites.',
      price: 45.00,
      image: '/images/equipment/welder generator.jpg',
      inStock: true,
      category: 'power-generation'
    },
    {
      id: '2',
      name: 'Heavy-Duty Grout Pump',
      description: 'Industrial grout pump for concrete and construction applications.',
      price: 35.00,
      image: '/images/equipment/HEAVY-DUTY GROUT PUMP.jpg',
      inStock: true,
      category: 'pumps'
    },
    {
      id: '3',
      name: 'Tube and Clamp Scaffold System',
      description: 'Versatile scaffolding system for construction and maintenance work.',
      price: 25.00,
      image: '/images/equipment/Tube and Clamp Scaffold System.jpg',
      inStock: true,
      category: 'access'
    },
    {
      id: '4',
      name: 'Self-Priming Sewage Trash Pump',
      description: 'Heavy-duty pump for sewage and waste water management.',
      price: 40.00,
      image: '/images/equipment/AMT Self-Priming Sewage Trash Pump.jpg',
      inStock: true,
      category: 'pumps'
    },
    {
      id: '5',
      name: 'Electric Auxiliary Water Pump',
      description: 'Reliable electric water pump for various construction applications.',
      price: 20.00,
      image: '/images/equipment/Electric Auxiliary Water Pump.jpg',
      inStock: true,
      category: 'pumps'
    },
    {
      id: '6',
      name: 'High Torque Impact Wrench',
      description: 'Professional impact wrench for heavy-duty construction tasks.',
      price: 15.00,
      image: '/images/equipment/High Torque Impact Wrench.jpg',
      inStock: true,
      category: 'tools'
    },
    {
      id: '7',
      name: 'Portable Light Tower',
      description: 'Mobile lighting solution for construction sites and events.',
      price: 55.00,
      image: '/images/equipment/Portable Light Tower.png',
      inStock: true,
      category: 'lighting'
    },
    {
      id: '8',
      name: 'Self-Propelled Petrol Lawn Mower',
      description: 'Professional lawn mower for landscaping and maintenance work.',
      price: 30.00,
      image: '/images/equipment/self-propelled-petrol-lawnmower.jpg',
      inStock: true,
      category: 'landscaping'
    },
  ]

  return (
    <div className="space-y-12">
      {/* Minimal hero */}
      <section className="relative overflow-hidden rounded-lg border bg-white">
        <div className="relative aspect-[16/6] w-full">
          <Image
            src={banners[0]}
            alt={`${config.name} banner`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6">
          <div>
            <h1 className="text-xl font-display font-semibold sm:text-2xl">{config.name}</h1>
            {config?.subtitle && (
              <p className="text-sm text-gray-600">{config.subtitle}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/products">
                Shop now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <Heading
            title="Featured Equipment"
            description="Popular construction equipment available for hourly rental"
          />
          <Button variant="outline" asChild>
            <Link href="/products">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Your Trusted Partner in Construction Equipment Rentals
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At EDUSTECH ENTERPRISE, we understand that every construction project has unique requirements. 
                  That's why we've built our business around providing flexible, reliable equipment rental solutions 
                  that keep your projects moving forward without the burden of equipment ownership.
                </p>
                <p>
                  Our extensive inventory includes everything from power generation equipment and water pumps to 
                  concrete mixers, excavation tools, and access equipment. Whether you're working on a small 
                  renovation or a large-scale construction project, we have the tools you need.
                </p>
                <p>
                  We pride ourselves on offering competitive hourly rates, well-maintained equipment, and 
                  exceptional customer service. Our team of experienced professionals is here to help you 
                  select the right equipment for your specific needs and ensure safe, efficient operation.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24+</div>
                  <div className="text-sm text-gray-600">Equipment Types</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Hourly</div>
                  <div className="text-sm text-gray-600">Flexible Rates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Maintained Equipment</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Equipment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-900 mb-2">Power Generation</h3>
                    <p className="text-sm text-gray-600">Diesel generators, welder generators, and portable power solutions</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-900 mb-2">Water Equipment</h3>
                    <p className="text-sm text-gray-600">Pumps for sewage, grout, and auxiliary water applications</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-900 mb-2">Concrete Equipment</h3>
                    <p className="text-sm text-gray-600">Mixers, edgers, trowels, and finishing tools</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-900 mb-2">Access Equipment</h3>
                    <p className="text-sm text-gray-600">Scaffolding, scissor lifts, and aerial platforms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
              