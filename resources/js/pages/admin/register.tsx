import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Role, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Mail } from 'lucide-react';

interface Props {
    user: User;
    roles: Role[];
    regions: string[]
}

export default function Register({ user, roles, regions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: 'j@k.com',
        role_id: roles.length > 0 ? roles[0].id : 1,
        region: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users/register');
    };
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <Head title="Enregistrement" />

            {/* Left Side - Branding */}
            <div className="relative hidden flex-col justify-between bg-zinc-900 p-10 text-white lg:flex dark:bg-zinc-900">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <img src="/logo.svg" alt="Logo" className="mr-2 h-8 w-8" />
                    Gestion Incidents
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">Rôle: {user.role.nom}</div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">&ldquo;La sécurité et l'efficacité de nos opérations dépendent de la vigilance de chacun.&rdquo;</p>
                        <footer className="text-sm">Service Technique</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center py-11 mb-5">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Enregistrement</h1>
                        <p className="text-balance text-muted-foreground">Entrez vos identifiants pour accéder à votre espace</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@domaine.com"
                                    required
                                    className="pl-9"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                        </div>
                        <div>
                            <Label htmlFor="role" className="text-base font-medium">
                                type
                            </Label>
                            <NativeSelect
                                id="role"
                                value={data.role_id}
                                onChange={(e) => setData('role_id', parseInt(e.target.value))}
                                className="mt-2"
                            >
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.nom}
                                    </option>
                                ))}
                            </NativeSelect>
                            {errors.role_id && <p className="mt-2 text-sm text-red-600">{errors.role_id}</p>}
                        </div>
                        <div>
                            <Label htmlFor="region" className="text-base font-medium">
                                type
                            </Label>
                            <NativeSelect
                                id="region"
                                value={data.region}
                                onChange={(e) => setData('region', e.target.value)}
                                className="mt-2"
                            >
                                <option value="">Selectionner région</option>
                                {regions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </NativeSelect>
                            {errors.region && <p className="mt-2 text-sm text-red-600">{errors.region}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Enregistrement en cours...' : 'Enregistrer'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
