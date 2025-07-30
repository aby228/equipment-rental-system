// new-rentals/frontend/components/equipment-card.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function EquipmentCard({ equipment }) {
  return (
    <Link href={`/equipment/${equipment.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{equipment.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{equipment.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold">${equipment.dailyRate}/day</p>
            <p className="text-sm text-gray-600">{equipment.quantity} available</p>
          </div>
        </div>
      </div>
    </Link>
  );
}