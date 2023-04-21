import { Sequelize } from 'sequelize-typescript';

export const getTransactionNumber = (TransactionID: any, TransactionType: any, TransactionDate?: Date): string => {
    const TransactionDateObj = TransactionDate ? TransactionDate : new Date();
    let TransactionYear = TransactionDateObj.getFullYear().toString();
    let TransactionMonth = ('0' + (TransactionDateObj.getMonth() + 1)).slice(-2);
    let TransactionDay = ('0' + TransactionDateObj.getDate()).slice(-2);
    let TransactionSequence = ('0000000' + TransactionID.toString()).slice(-4);
  
    return `${TransactionType}#${TransactionYear}${TransactionMonth}${TransactionDay}-${TransactionSequence}`;
}


export const TransactionDate = (TransactionDateStr) => {
    return new Date(
        `${TransactionDateStr.substr(0, 4)}-${TransactionDateStr.substr(4,2,)}-${TransactionDateStr.substr(6, 2)}`,);
}

export const OrderNumberToUp = (): string => {
    const date = new Date();
    return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
}

export const conCat =  async(source:any, target:any)=>{
    const sequelize = new Sequelize()

    const sources:any =  await sequelize.query(
        `SELECT * FROM payment.user_accountfindall  WHERE  "accountNumber" = '${source}'::text`,
      );

      const targets:any = await sequelize.query(
        `SELECT * FROM payment.user_accountfindall  WHERE  "accountNumber" = '${target}'::text`,
      );
      return ` Top Up ${sources[0][0].paymentType} To ${targets[0][0].paymentType}`
}





