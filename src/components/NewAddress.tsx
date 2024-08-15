import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NewAddress() {
    const {isAuthenticated, user} = useKindeBrowserClient();
    const [formData, setFormData] = useState({
        mobile: '',
        house: '',
        area: '',
        landmark: '',
        city: '',
        state: '',
        pin: ''
    });

    const handleSubmit = async () => {
        const data = {...formData, userEmail: user?.email, userAuthId: user?.id, userFirstName: user?.given_name, userLastName: user?.family_name};
        
        try {
            const res = await fetch('/api/address', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(data)
                },
            })
            const resData = await res.json();
            if (resData.success) {
                // console.log(data.products)
                alert("Address saved!")
                // console.log(products);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="justify-items-center">
            <Card className="w-2/4">
                <CardHeader>
                    <CardTitle>Enter your address</CardTitle>
                    <CardDescription>This address will be used by default for all of your orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                    <div className="grid w-full items-center gap-4 gap-y-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">House</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter House" 
                                value={formData.house} 
                                onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Mobile Number</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter Mobile no" 
                                value={formData.mobile} 
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Area</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter Area" 
                                value={formData.area} 
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Landmark</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter Landmark" 
                                value={formData.landmark} 
                                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">City</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter City" 
                                value={formData.city} 
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">State</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter State" 
                                value={formData.state} 
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Pin</Label>
                            <Input 
                                type="number" 
                                placeholder="Enter Pin" 
                                value={formData.pin} 
                                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                            />
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleSubmit} className="w-full">Save</Button>
                </CardFooter>
            </Card>

            {/* <form className="flex flex-col">
                <h1>Enter your address</h1>
                <Input 
                    type="text" 
                    placeholder="House" 
                    value={formData.house} 
                    onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                />
                <Input 
                    type="text" 
                    placeholder="Mobile no" 
                    value={formData.mobile} 
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
                <Input 
                    type="text" 
                    placeholder="Area" 
                    value={formData.area} 
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
                <Input 
                    type="text" 
                    placeholder="Landmark" 
                    value={formData.landmark} 
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                />
                <Input 
                    type="text" 
                    placeholder="City" 
                    value={formData.city} 
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input 
                    type="text" 
                    placeholder="State" 
                    value={formData.state} 
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <Input 
                    type="text" 
                    placeholder="Pin" 
                    value={formData.mobile} 
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                />
            </form>
            <button onClick={() => handleSubmit()}>Submit</button> */}
        </div>
    )
}