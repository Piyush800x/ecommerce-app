import { Input } from "./ui/input";
import { useState } from "react";

export default function NewAddress() {
    const [formData, setFormData] = useState({
        mobile: '',
        house: '',
        area: '',
        landmark: '',
        city: '',
        state: '',
        pin: ''
    });

    return (
        <div>
            <form>
                <Input 
                    type="number" 
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
        </div>
    )
}