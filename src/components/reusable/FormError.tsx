import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";

interface FormErrorProps{
    message?: string;
}

function FormError({message}: FormErrorProps){

    return (
        <div className={message ? 'FormError' : 'FormError invisible'}>
            <span>
                {message}
            </span>
        </div>
    );
}

export default FormError;