import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'expert',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '2',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'beginner',
      orderID: '23M3UOG65G8K',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '3',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'expert',
      orderID: 'F6JHK65MS818',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '4',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'competent',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '5',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'expert',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '6',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'competent',
      orderID: '6RS606CBMKVQ',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '7',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'competent',
      orderID: '479KUYHOBMJS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1212'
    },
    {
      id: '8',
      orderDetails: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'beginner',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Paypal Account',
      sourceDesc: '*** 1111'
    },
    {
      id: '9',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'beginner',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Bank Account',
      sourceDesc: '*** 2222'
    },
    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'beginner',
      orderID: '17KRZHY8T05M',
      sourceName: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet"
    }
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
