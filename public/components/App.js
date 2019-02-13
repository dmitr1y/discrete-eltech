import MainNavigation from './MainNavigation'
import Header from './Header'
import React from "react";

export default function App({children}) {
    return (
        <div>
            <Header/>
            <div
                className="container">
                <MainNavigation
                    items={
                        [
                            {title: 'НОД', url: '/gcd'},
                            {
                                title: 'ax + by = 1', url:
                                    '/axby1'
                            }
                            ,
                            {
                                title: 'Цепная дробь', url:
                                    '/fraction'
                            }
                            ,
                            {
                                title: 'Подходящие дроби', url:
                                    '/convergents'
                            }
                            ,
                            {
                                title: 'Обратное число', url:
                                    '/inverse'
                            }
                            ,
                            {
                                title: 'Диофантово уравнение', url:
                                    '/diophantine'
                            }
                            ,
                            {
                                title: 'Быстрое возведение в степень', url:
                                    '/fastDegree'
                            }
                            ,
                            // {title: 'Перевод из одной системы счисления в другую', url: '/conversion'},
                            {
                                title: 'Схема Горнера', url:
                                    '/horner'
                            }
                            ,
                        ]
                    }
                />
                <main
                    id="content"> {children} </main>
            </div>
        </div>
    )
}
