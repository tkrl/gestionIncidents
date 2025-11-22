import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Auth } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Login({ user }: Auth) {
    const { data, setData, post, processing, errors } = useForm({
        matricule: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="">
            <div className="flex h-screen items-center justify-center">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="rounded-2xl p-10 shadow-2xl w-80">
                    <div className="mt-5">
                        <Label className='mb-1'>Matricule</Label>
                        <Input value={data.matricule} onChange={(e) => setData('matricule', e.target.value)} />
                        {errors.matricule && <div className="text-red-400">{errors.matricule}</div>}
                    </div>
                    <div className="mt-5">
                        <Label className='mb-1'>Email</Label>
                        <Input value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <div className="text-red-400">{errors.email}</div>}
                    </div>
                    <div className="mt-5">
                        <Label className='mb-1'>Password</Label>
                        <Input value={data.password} type="password" onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && <div className="text-red-400">{errors.password}</div>}
                    </div>

                    <div className="mt-5 w-full px-5">
                        <Button type="submit" disabled={processing} className="w-full">
                            Valider
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
