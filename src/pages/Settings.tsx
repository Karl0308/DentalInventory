import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Save, Bell, Building2, Users, Shield } from 'lucide-react'

export default function Settings() {
  const [clinicName, setClinicName] = useState('SmileCare Dental Clinic')
  const [clinicEmail, setClinicEmail] = useState('admin@smilecare.ph')
  const [expiryDays, setExpiryDays] = useState('30')
  const [lowStockThreshold, setLowStockThreshold] = useState('20')

  const [notifyExpiry, setNotifyExpiry] = useState(true)
  const [notifyLowStock, setNotifyLowStock] = useState(true)
  const [notifyReorder, setNotifyReorder] = useState(false)
  const [notifyBatchExpired, setNotifyBatchExpired] = useState(true)

  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure your inventory system preferences and clinic information."
      />

      <Tabs defaultValue="clinic">
        <TabsList>
          <TabsTrigger value="clinic" className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            Clinic
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Users
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Clinic Settings */}
        <TabsContent value="clinic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clinic Information</CardTitle>
              <CardDescription>Basic details about your dental clinic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="clinicName">Clinic Name</Label>
                  <Input
                    id="clinicName"
                    value={clinicName}
                    onChange={e => setClinicName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="clinicEmail">Admin Email</Label>
                  <Input
                    id="clinicEmail"
                    type="email"
                    value={clinicEmail}
                    onChange={e => setClinicEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="PHP">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHP">PHP — Philippine Peso (₱)</SelectItem>
                      <SelectItem value="USD">USD — US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">EUR — Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="Asia/Manila">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Manila">Asia/Manila (UTC+8)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Settings */}
        <TabsContent value="alerts" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alert Thresholds</CardTitle>
              <CardDescription>Configure when alerts are triggered.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="expiryDays">Expiry Warning (days before)</Label>
                  <Input
                    id="expiryDays"
                    type="number"
                    min="1"
                    value={expiryDays}
                    onChange={e => setExpiryDays(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Alert when items expire within this many days.</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold (%)</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    min="1"
                    max="100"
                    value={lowStockThreshold}
                    onChange={e => setLowStockThreshold(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Alert when stock falls below this % of ideal.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose which events trigger notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'expiry', label: 'Expiry Alerts', description: 'Notify when batches are nearing expiry.', value: notifyExpiry, onChange: setNotifyExpiry },
                { id: 'lowStock', label: 'Low Stock Alerts', description: 'Notify when stock falls below reorder point.', value: notifyLowStock, onChange: setNotifyLowStock },
                { id: 'reorder', label: 'Reorder Suggestions', description: 'Notify when items reach reorder quantity.', value: notifyReorder, onChange: setNotifyReorder },
                { id: 'batchExpired', label: 'Batch Expired', description: 'Notify when a batch passes its expiry date.', value: notifyBatchExpired, onChange: setNotifyBatchExpired },
              ].map(item => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch checked={item.value} onCheckedChange={item.onChange} />
                </div>
              ))}
              <Separator />
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Users</CardTitle>
              <CardDescription>Staff members with access to this system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Ana Reyes', role: 'Dentist', email: 'ana.reyes@smilecare.ph', status: 'Active' },
                  { name: 'Maria Santos', role: 'Admin', email: 'maria.santos@smilecare.ph', status: 'Active' },
                  { name: 'Liza Mendoza', role: 'Assistant', email: 'liza.mendoza@smilecare.ph', status: 'Active' },
                ].map(user => (
                  <div key={user.email} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge variant="success" className="text-xs">{user.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Settings</CardTitle>
              <CardDescription>Access control and session configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Require login on startup', description: 'Always prompt for credentials when the app opens.', defaultChecked: true },
                { label: 'Session timeout (15 min)', description: 'Auto-logout after 15 minutes of inactivity.', defaultChecked: false },
                { label: 'Audit logging', description: 'Record all actions to the audit log.', defaultChecked: true },
                { label: 'Two-factor authentication', description: 'Require 2FA for admin users.', defaultChecked: false },
              ].map(item => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
