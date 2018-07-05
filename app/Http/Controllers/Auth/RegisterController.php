<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\SendMail\SendMail;

class RegisterController extends Controller
{
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'login' => 'required|string|max:16|min:4|unique:users',
            'firstname' => 'required|string|max:32|min:2',
            'lastname' => 'required|string|max:32|min:2',
            'email' => 'required|string|email|max:64|unique:users',
            'password' => 'required|max:32|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
        ]);
    }

    protected function create(array $data, $hashed_link)
    {
        return User::create([
            'login' => $data['login'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'reg_link' => $hashed_link
        ]);
    }

    public function attemptRegister(Request $request)
    {
      $validator = $this->validator($request->all());
      if ($validator->fails())
        return $validator->errors();

      $hashed_link = hash("sha256", rand(0, 1000));
      $this->create($request->all(), $hashed_link);
      $SendMail = new SendMail();
      return $SendMail->send_mail($request->input('email'), "Click on the link to confirm your account: http://localhost:8100/confirm?email=" . $request->input('email') . "&reg_link=" . $hashed_link, "User creation");
    }

    public function confirmViaEmail()
    {
      $user = User::where('email', $_GET['email'])->first();
      if ($user == '')
        return "User not found";
      if ($user->reg_link != $_GET['reg_link'])
        return "Reg link is wrong";
      $user->access_level = 1;
      $user->save();
      header("Location: http://localhost:8100");
      die();
    }
}
