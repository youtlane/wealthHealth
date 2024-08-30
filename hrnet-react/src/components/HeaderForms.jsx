import Image from 'next/image';
import Link from 'next/link';


const HeaderForms = () => {
    return (
        <div className="border-b border-gray-300 pb-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center">HRnet</h1>
            <div className="flex flex-col items-center mt-4">
                <Image
                    src="/hrnet-logo.png"
                    alt="HRnet Logo"
                    width={150}
                    height={100}
                    className="rounded-lg shadow-md"
                />
                <Link className="mt-2 text-sm text-indigo-600 hover:underline" href="/allEmployee">View Current Employees</Link>
                <h2 className="text-xl font-semibold text-gray-800 mt-4">Create Employee</h2>
            </div>
        </div>
    )
}

export default HeaderForms
