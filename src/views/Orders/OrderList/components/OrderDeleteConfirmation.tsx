import React from 'react';
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast';

type OrderDeleteConfirmationProps = {
    
};

const OrderDeleteConfirmation = () => {
    
    const deleteSucceed = (success: boolean) => {
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const onDialogClose = () => {
        console.log("Delete Dialog Closed!")
    }

    const handleDelete = () => {
            deleteSucceed(true);
        
    };

    return (
        <ConfirmDialog 
            type="danger"
            title="Delete product"
            confirmButtonColor="red-600"
            isOpen={false} 
            onClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={handleDelete}
        >
            <div>
                <p>
                    Are you sure you want to delete this order? All record related
                    to this order will be deleted as well. This action cannot be
                    undone.
                </p>
            </div>
        </ConfirmDialog>
    );
};

export default OrderDeleteConfirmation;

