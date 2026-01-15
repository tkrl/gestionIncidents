import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex justify-center items-center h-screen">
                <a href='/login'>
                    <Button variant="ghost" className='cursor-pointer'>Connexion</Button>
                </a>
            </div>
        </>
    );
}
