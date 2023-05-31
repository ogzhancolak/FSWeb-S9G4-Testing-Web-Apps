import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu />);
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu />);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('İletişim Formu');
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu />);
    const adInput = screen.getByLabelText("Ad*");
    const submitButton = screen.getByText("Gönder");

    userEvent.type(adInput, "abc");
    userEvent.click(submitButton);
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const submitButton = screen.getByRole('button', { name: 'Gönder' });
    userEvent.click(submitButton);
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const nameInput = screen.getByLabelText('Ad*');
    const surnameInput = screen.getByLabelText('Soyad*');
    userEvent.type(nameInput, 'John');
    userEvent.type(surnameInput, 'Doe');
    const submitButton = screen.getByRole('button', { name: 'Gönder' });
    userEvent.click(submitButton);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'gecersiz-email');
    const submitButton = screen.getByRole('button', { name: 'Gönder' });
    userEvent.click(submitButton);
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const nameInput = screen.getByLabelText('Ad*');
    userEvent.type(nameInput, 'John');
    const submitButton = screen.getByRole('button', { name: 'Gönder' });
    userEvent.click(submitButton);
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu />);
    const nameInput = screen.getByLabelText('Ad*');
    const surnameInput = screen.getByLabelText('Soyad*');
    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(nameInput, 'John');
    userEvent.type(surnameInput, 'Doe');
    userEvent.type(emailInput, 'john@example.com');
    const submitButton = screen.getByRole('button', { name: 'Gönder' });
    userEvent.click(submitButton);
    const errorMessage = screen.queryByTestId('error');
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu />);
    const nameInput = screen.getByLabelText('Ad*');
    const surnameInput = screen.getByLabelText('Soyad*');
    const emailInput = screen.getByLabelText('Email*');
    const messageInput = screen.getByLabelText('Mesaj');
    userEvent.type(nameInput, 'John');
    userEvent.type(surnameInput, 'Doe');
    userEvent.type(emailInput, 'john@example.com');
    userEvent.type(messageInput, 'Bu bir test mesajıdır');
    const submitButton = screen.getByRole('button', { name: 'Gönder' });
    userEvent.click(submitButton);
});
