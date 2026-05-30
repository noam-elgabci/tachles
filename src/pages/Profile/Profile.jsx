import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const STATUS_COLORS = {
  delivered: 'bg-green-100 text-green-700',
  processing: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

function SettingsTab({ user, updateUser }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = e => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Settings</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">
            Full Name
          </label>
          <input
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer border-none ${
            saved ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

function PaymentTab({ user }) {
  return (
    <div className="max-w-md">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Details</h2>
      <div className="space-y-3">
        {user?.paymentMethods.map(pm => (
          <div key={pm.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {pm.type} •••• {pm.last4}
                {pm.isDefault && (
                  <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                    Default
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Expires {pm.expiry}</p>
            </div>
            <button className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent">
              Remove
            </button>
          </div>
        ))}

        <button className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors cursor-pointer bg-white">
          + Add Payment Method
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-bold text-gray-900 mb-4">Saved Addresses</h3>
        <div className="space-y-3">
          {user?.addresses.map(addr => (
            <div key={addr.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {addr.label}
                  {addr.isDefault && (
                    <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                      Default
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {addr.street}, {addr.city} {addr.state} {addr.zip}
                </p>
              </div>
              <button className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent">
                Remove
              </button>
            </div>
          ))}

          <button className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors cursor-pointer bg-white">
            + Add Address
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersTab({ user }) {
  if (!user?.reservations?.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">No orders yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order History</h2>
      <div className="space-y-4">
        {user.reservations.map(order => (
          <div key={order.id} className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Order
                </span>
                <p className="text-sm font-bold text-gray-900">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{order.date}</p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                    STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-1.5">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.qty}
                  </span>
                  <span className="text-gray-900 font-semibold">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400 space-y-0.5">
                <p>{order.payment}</p>
                <p>{order.address}</p>
              </div>
              <p className="text-base font-bold text-gray-900">${order.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: 'settings', label: 'Settings' },
  { id: 'payment', label: 'Payment' },
  { id: 'orders', label: 'Orders' },
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'settings';

  const setTab = id => {
    setSearchParams({ tab: id });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
          {user?.name?.[0] || '?'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Guest'}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer border-none bg-transparent relative ${
              activeTab === tab.id
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'settings' && <SettingsTab user={user} updateUser={updateUser} />}
      {activeTab === 'payment' && <PaymentTab user={user} />}
      {activeTab === 'orders' && <OrdersTab user={user} />}
    </div>
  );
}
