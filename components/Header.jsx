'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  const headerMenu = [
    {
      id: 1,
      name: 'Ride',
      icon: '/taxi.png',
    },
    {
      id: 2,
      name: 'Package',
      icon: '/uber-box.png',
    },
  ];

  return (
    <div className="p-5 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
      <div className="flex gap-24 items-center">
        <Image
          src={'/uber.png'}
          width={70}
          height={70}
          onClick={() => router.push('/')}
          className=" cursor-pointer active:scale-95"
        />
        <div className="flex gap-6 items-center">
          {headerMenu.map((item) => (
            <div className="flex gap-2 items-center">
              <Image
                src={item.icon}
                width={25}
                height={25}
              />
              <h2 className="text-[14px] font-medium">{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <UserButton />
    </div>
  );
}

export default Header;
